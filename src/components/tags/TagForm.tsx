"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { handleTagForm } from "@/lib/actions";
import TagRules from "./form/TagRules";
import StagedTags from "./form/StagedTags";

export default function TagForm() {
  const [_, formAction] = useFormState(handleTagForm, null);
  const [stagedTags, setStagedTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState<string>("");

  return (
    <form
      action={formAction}
      className="w-full shadow-lg"
      onSubmit={() => setStagedTags([])}
    >
      <h1 className="text-2xl text-tertiary">Form:</h1>
      <TagRules />
      <div className="flex w-full flex-row">
        <div
          className={`${stagedTags.length == 0 ? "rounded-bl" : null} flex h-10 w-10 items-center justify-center bg-white text-3xl text-tertiary`}
        >
          #
        </div>
        <input
          type="text"
          name="clientForm"
          className="h-10 w-full p-2 placeholder:text-tertiary focus:outline-none focus:ring-0"
          placeholder="Type tag here; Hit Enter; Repeat; Submit;"
          value={inputTag}
          onChange={(event) => {
            setInputTag(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              event.preventDefault();
              if (/^[a-z_]+$/.test(inputTag) && !/\s/.test(inputTag)) {
                setStagedTags((prev) => [...new Set([...prev, inputTag])]);
              }
              setInputTag("");
            }
          }}
        />
        <button
          type="submit"
          className={`${stagedTags.length == 0 ? "rounded-br" : null} flex h-10 w-32 items-center justify-center bg-primary text-tertiary`}
        >
          Submit tags
        </button>
      </div>
      <input type="hidden" name="tags" value={stagedTags} />

      <StagedTags stagedTags={stagedTags} setStagedTags={setStagedTags} />
    </form>
  );
}
