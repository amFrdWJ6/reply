"use server";
import { getTagsIDs } from "@/lib/db/queries";
import { isFileFormatAllowed, isURLFileFormatAllowed } from "@/lib/utils";
import { createDBRecords } from "./createDBRecords";
import { downloadFile } from "./downloadFile";
import { uploadFile } from "./uploadFile";

export async function handleUploadForm(prev: any, formData: FormData) {
  const title: string = formData.get("title") as string;
  const formTags: string = formData.get("tags") as string;
  const upload: File | string = formData.get("upload") as File | string;
  const user: string = formData.get("user") as string;

  const destSrc = process.env.APP_UPLOADS_DIR;
  if (destSrc == undefined) {
    throw new Error("Missing ENV variable: APP_UPLOADS_DIR");
  }

  const tags = await getTagsIDs(formTags.split(","));

  if (typeof upload === "string") {
    if (!isURLFileFormatAllowed(upload)) {
      return {
        type: "error",
        message: `${upload.split(".").pop()} is not allowed format`,
      };
    }
    const result = await downloadFile(upload, destSrc);
    if (result.type === "success") {
      return await createDBRecords(title, result.fileName, user, tags);
    } else {
      return result;
    }
  }

  if (upload instanceof File) {
    if (!isFileFormatAllowed(upload)) {
      return { type: "error", message: `${upload.type} is not allowed format` };
    }
    const result = await uploadFile(upload, destSrc);
    if (result.type === "success") {
      return await createDBRecords(title, result.fileName, user, tags);
    } else {
      return result;
    }
  }
}
