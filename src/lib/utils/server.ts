"use server";
import { DEFAULT_CONTENT_TYPE, allowed_file_formats } from "../const";
import { getAllTags } from "../db/queries";

/**
 * Validate user's tags against database entries.
 * @param q
 * @returns Array<string>
 */
export async function validateTags(userTags: string) {
  const allTagNames = (await getAllTags()).map((tag) => tag.name);
  const tags = userTags.split(",");
  return tags.filter((tag) => allTagNames.includes(tag));
}

export async function getContentType(fileExtension: string | undefined) {
  if (fileExtension != undefined) {
    const fileFormat = allowed_file_formats.get(fileExtension);
    return fileFormat != undefined ? fileFormat : DEFAULT_CONTENT_TYPE;
  }
  return DEFAULT_CONTENT_TYPE;
}
