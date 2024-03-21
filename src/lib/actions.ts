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
  CreateTag,
  GetAllTags,
  GetTagsIDs,
} from "./db/queries";
import { RTag } from "./db/schema";
import { isFileFormatAllowed, isURLFileFormatAllowed } from "./utils";
import { signIn, signOut } from "@/auth";

export async function handleSearchForm(prev: any, formData: FormData) {
  const formTags: string = formData.get("tags") as string;
  if (formTags == "") {
    redirect("/");
  }
  const allTags = await GetAllTags();
  const tags: string | string[] = formTags.includes(",")
    ? formTags.split(",")
    : formTags;
  const validatedTags = allTags
    .filter((tag) => tags.includes(tag.name))
    .map((tag) => tag.name);
  redirect(`/?tags=${validatedTags}`);
}

export async function handleTagForm(prev: any, formData: FormData) {
  const formTags: string = formData.get("tags") as string;
  const user: string = formData.get("user") as string;

  if (formTags == "") {
    redirect("/tags");
  }
  const allTags = await GetAllTags();
  const validatedTags: { name: string }[] = (
    formTags.includes(",") ? formTags.split(",") : [formTags]
  )
    .map((tag) => {
      return { name: tag };
    })
    .filter((tag) => !/\s/.test(tag.name))
    .filter((tag) => /^[a-z_]+$/.test(tag.name))
    .filter((tag) => !allTags.map((dbtag) => dbtag.name).includes(tag.name));
  if (validatedTags.length == 0) {
    return {
      type: "error",
      message: `None of submitted tags were viable`,
    };
  }
  const tags_ids = await CreateTag(validatedTags);
  if (tags_ids != undefined) {
    await CreateLog(user, "added tag", tags_ids!);
  }
  revalidatePath("/tags");
  revalidatePath("/upload");
  redirect(`/tags`);
}

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

async function CreateDBRecords(
  title: string,
  fileName: string,
  user: string,
  tags: RTag[],
) {
  const reply = await CreateReply(title, fileName);
  if (reply != null) {
    const tagsToReply = await AddTagsToReply(reply.id, tags);
    if (tagsToReply == null) {
      console.log(`New reply without tags added. Reply ID: ${reply.id}`);
      return {
        type: "error",
        message: `Failed to add tags to your new reply`,
      };
    }

    await CreateLog(user, "added reply", reply.id);

    revalidatePath("/");
    revalidatePath("/log");
    redirect("/");
  } else {
    await unlink(fileName);
    return {
      type: "error",
      message: `Failed to create DB record for new Reply`,
    };
  }
}

// Download
type ResultSuccess = { type: "success"; fileName: string };
type ResultError = { type: "error"; message: string };

const isAxiosTimeoutError = (error: any): error is AxiosError => {
  return axios.isAxiosError(error) && error.code === "ECONNABORTED";
};

async function DownloadFile(
  url: string,
  destDir: string,
): Promise<ResultSuccess | ResultError> {
  const controller = new AbortController();
  const signal = controller.signal;
  const fileName = [uuidv4(), url.split(".").pop()].join(".");
  const destPath = `${destDir}/${fileName}`;
  const destStream = createWriteStream(destPath);
  let receivedBytes = 0;

  try {
    const response: AxiosResponse<NodeJS.ReadableStream> = await axios.get(
      url,
      { responseType: "stream", signal, timeout: DOWNLOAD_TIMEOUT },
    );

    response.data.on("data", (chunk: Buffer) => {
      receivedBytes += chunk.length;

      if (receivedBytes > MAX_FILE_SIZE_BYTES) {
        controller.abort();
      }
    });

    response.data.pipe(destStream);

    const downloadPromise = new Promise<ResultSuccess | ResultError>(
      (resolve, reject) => {
        destStream.on("finish", () => {
          resolve({ type: "success", fileName: fileName });
        });

        signal.addEventListener("abort", () => {
          destStream.destroy();
          unlink(destPath);
          reject({
            type: "error",
            message: "Download aborted due to exceeding file size limit.",
          });
        });

        destStream.on("error", (error) => {
          console.error("Error writing to destination stream:", error.message);
          // unlink(destPath);
          reject({
            type: "error",
            message: "An error occurred during file writing.",
          });
        });
      },
    );

    await Promise.all([downloadPromise]);

    return downloadPromise;
  } catch (error) {
    if (isAxiosTimeoutError(error)) {
      await unlink(destPath);
    }
    return {
      type: "error",
      message: (error as Error).message || "An unexpected error",
    };
  }
}

async function UploadFile(
  file: File,
  destDir: string,
): Promise<ResultSuccess | ResultError> {
  const fileName = [uuidv4(), file.type.split("/").pop()].join(".");
  const destFilePath = `${destDir}/${fileName}`;

  return await writeFile(destFilePath, Buffer.from(await file.arrayBuffer()))
    .then(() => {
      return { type: "success", fileName: fileName } as ResultSuccess;
    })
    .catch((err: Error) => {
      console.log(err);
      return { type: "error", message: err.message } as ResultError;
    });
}

// Auth
export async function handleSignIn() {
  return await signIn("github");
}

export async function handleSignOut() {
  return await signOut();
}
