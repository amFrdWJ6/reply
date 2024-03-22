"use server";

import { validateTags } from "@/lib/utils/server";
import { redirect } from "next/navigation";

export async function handleSearchForm(prev: any, formData: FormData) {
  const formTags = formData.get("tags") as string;
  if (formTags == "") {
    redirect("/");
  }

  const validatedTags = await validateTags(formTags);
  validatedTags.length == 0
    ? redirect("/")
    : redirect(`/?tags=${validatedTags}`);
}
