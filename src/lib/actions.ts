"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import {
  AddTagsToReply,
  CreateReply,
  CreateTag,
  GetAllTags,
  GetTagsIDs,
} from "./db/queries";
import {
  DownloadFile,
  UploadFile,
  isFileFormatAllowed,
  isURLFileFormatAllowed,
} from "./utils";

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
    redirect("/tags");
  }
  await CreateTag(validatedTags);
  revalidatePath("/tags");
  revalidatePath("/upload");
  redirect(`/tags`);
}

export async function handleUploadForm(prev: any, formData: FormData) {
  const title: string = formData.get("title") as string;
  const formTags: string = formData.get("tags") as string;
  const upload: File | string = formData.get("upload") as File | string;
  const destSrc = "public/uploads";

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
      const reply = await CreateReply(title, result.fileName);
      if (reply != null) {
        await AddTagsToReply(reply.id, tags);
        revalidatePath("/");
        redirect("/");
      } else {
        await unlink(result.fileName);
        return {
          type: "error",
          message: `Failed to create DB record for new Reply`,
        };
      }
    }
  }

  if (upload instanceof File) {
    if (!isFileFormatAllowed(upload)) {
      return { type: "error", message: `${upload.type} is not allowed format` };
    }
    const result = await UploadFile(upload, destSrc);
    if (result.type === "success") {
      const reply = await CreateReply(title, result.fileName);
      if (reply != null) {
        await AddTagsToReply(reply.id, tags);
        revalidatePath("/");
        redirect("/");
      } else {
        await unlink(result.fileName);
        return {
          type: "error",
          message: `Failed to create DB record for new Reply`,
        };
      }
    }
  }
}
