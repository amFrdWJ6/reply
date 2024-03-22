"use server";
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
