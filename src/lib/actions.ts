"use server";

import { redirect } from "next/navigation";
import { CreateTag, GetAllTags } from "./db/queries";
import { revalidatePath } from "next/cache";

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
  redirect(`/tags`);
}

export async function handleUploadForm(prev: any, formData: FormData) {}
