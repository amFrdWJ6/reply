"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createLog, createTag, getAllTags } from "@/lib/db/queries";

export async function handleTagForm(prev: any, formData: FormData) {
  const formTags: string = formData.get("tags") as string;
  const user: string = formData.get("user") as string;

  if (formTags == "") {
    redirect("/tags");
  }
  const allTags = await getAllTags();
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
  const tags_ids = await createTag(validatedTags);
  if (tags_ids != undefined) {
    await createLog(user, "added tag", tags_ids!);
  }
  revalidatePath("/tags");
  revalidatePath("/upload");
  redirect(`/tags`);
}
