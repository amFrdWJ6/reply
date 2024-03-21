"use server";

import { getAllTags } from "@/lib/db/queries";
import { redirect } from "next/navigation";

export async function handleSearchForm(prev: any, formData: FormData) {
  const formTags: string = formData.get("tags") as string;
  if (formTags == "") {
    redirect("/");
  }
  const allTags = await getAllTags();
  const tags: string | string[] = formTags.includes(",")
    ? formTags.split(",")
    : formTags;
  const validatedTags = allTags
    .filter((tag) => tags.includes(tag.name))
    .map((tag) => tag.name);
  redirect(`/?tags=${validatedTags}`);
}
