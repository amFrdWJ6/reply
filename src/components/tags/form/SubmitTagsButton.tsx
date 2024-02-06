"use client";

import { useFormStatus } from "react-dom";

export default function SubmitTagsButton({
  stagedTags,
}: {
  stagedTags: Array<string>;
}) {
  const { pending } = useFormStatus();
  const submit_tags = pending ? "Processing..." : "Submit tags!";

  return (
    <button
      type="submit"
      disabled={stagedTags.length == 0}
      className={`${stagedTags.length == 0 ? "rounded-br bg-secondary text-quaternary" : "bg-primary text-lg text-tertiary"} flex h-10 w-32 items-center justify-center`}
    >
      {stagedTags.length == 0 && pending == false ? "<<<" : submit_tags}
    </button>
  );
}
