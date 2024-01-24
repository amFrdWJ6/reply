"use server";

import { redirect } from "next/navigation";
import { GetAllTags } from "./db/queries";

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
