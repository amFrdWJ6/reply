"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { createWriteStream } from "fs";
import { unlink, writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { DOWNLOAD_TIMEOUT, MAX_FILE_SIZE_BYTES } from "./const";
import {
  AddTagsToReply,
  CreateLog,
  CreateReply,
  GetTagsIDs,
} from "./db/queries";
import { RTag } from "./db/schema";
import { isFileFormatAllowed, isURLFileFormatAllowed } from "./utils";
import { signIn, signOut } from "@/auth";

export async function handleUploadForm(prev: any, formData: FormData) {
  const title: string = formData.get("title") as string;
  const formTags: string = formData.get("tags") as string;
  const upload: File | string = formData.get("upload") as File | string;
  const user: string = formData.get("user") as string;

  const destSrc = process.env.UPLOADS_DIR;
  if (destSrc == undefined) {
    throw new Error("Missing ENV variable: UPLOADS_DIR");
  }

  const tags = await GetTagsIDs(formTags.split(","));

  if (typeof upload === "string") {
    if (!isURLFileFormatAllowed(upload)) {
      return {
        type: "error",
        message: `${upload.split(".").pop()} is not allowed format`,
      };
    }
    const result = await DownloadFile(upload, destSrc);
    if (result.type === "success") {
      return await CreateDBRecords(title, result.fileName, user, tags);
    } else {
      return result;
    }
  }

  if (upload instanceof File) {
    if (!isFileFormatAllowed(upload)) {
      return { type: "error", message: `${upload.type} is not allowed format` };
    }
    const result = await UploadFile(upload, destSrc);
    if (result.type === "success") {
      return await CreateDBRecords(title, result.fileName, user, tags);
    } else {
      return result;
    }
  }
}
// Auth
export async function handleSignIn() {
  return await signIn("github");
}

export async function handleSignOut() {
  return await signOut();
}
