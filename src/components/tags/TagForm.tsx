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
      className="w-full shadow-lg"
      onSubmit={() => setStagedTags([])}
    >
      <h1 className="text-2xl text-tertiary">Form:</h1>
      <div className="rounded-t bg-tertiary p-2 text-quaternary">
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
          className={`${stagedTags.length == 0 ? "rounded-bl" : null} flex h-10 w-10 items-center justify-center bg-white text-3xl text-tertiary`}
        >
          #
        </div>
        <input
          type="text"
          name="clientForm"
          className="h-10 w-full p-2 placeholder:text-tertiary"
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

      {stagedTags.length > 0 && (
        <div className="flex flex-col rounded-b bg-primary p-2 text-white">
          <h1 className=" text-2xl text-tertiary">Staged tags:</h1>
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
