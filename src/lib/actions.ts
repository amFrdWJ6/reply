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

// Auth
export async function handleSignIn() {
  return await signIn("github");
}

export async function handleSignOut() {
  return await signOut();
}
