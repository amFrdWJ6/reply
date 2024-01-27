"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { handleTagForm } from "@/lib/actions";
import StagingTag from "../header/form/StagingTag";

export default function TagForm() {
  const [_, formAction] = useFormState(handleTagForm, null);
  const [stagedTags, setStagedTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState<string>("");

  return (
    <form
      action={formAction}
      className="w-full"
      onSubmit={() => setStagedTags([])}
    >
      <h1 className="text-tertiary text-2xl">Form:</h1>
      <div className="bg-tertiary text-quaternary rounded-t p-2">
        <h1 className="text-primary">Rules:</h1>
        <ul className="list-inside list-decimal">
          <li>lowercase strings only</li>
          <li>use underscore as separator (small_example), if necessary</li>
          <li>no bullshit (your github acc is paired with ops, see log)</li>
          <li>do not cry on reset, host reply yourself</li>
        </ul>
      </div>
      <div className="flex w-full flex-row">
        <div
          className={`flex h-10 w-10 items-center justify-center ${stagedTags.length == 0 ? "rounded-bl" : null} text-tertiary bg-white text-3xl`}
        >
          #
        </div>
        <input
          type="text"
          name="clientForm"
          className="placeholder:text-tertiary h-10 w-full p-2"
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
          className={`bg-primary text-tertiary flex h-10 w-32 items-center justify-center ${stagedTags.length == 0 ? "rounded-br" : null}`}
        >
          Submit tags
        </button>
      </div>
      <input type="hidden" name="tags" value={stagedTags} />

      {stagedTags.length > 0 && (
        <div className="bg-primary flex flex-col  rounded-b p-2 text-white">
          <h1 className=" text-tertiary text-2xl">Staged tags:</h1>
          <div className="flex flex-row flex-wrap gap-2">
            {stagedTags.map((tag) => (
              <StagingTag
                key={tag}
                tag={tag}
                onClick={() => {
                  setStagedTags((prev) => [
                    ...prev.filter((stagedTag) => stagedTag !== tag),
                  ]);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
