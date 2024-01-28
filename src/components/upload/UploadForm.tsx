"use client";

import { handleUploadForm } from "@/lib/actions";
import { RTag } from "@/lib/db/schema";
import { getAllowedFormats, isFormatAllowed } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";

enum FromSourceState {
  FROMDISC = "fromDisc",
  FROMURL = "fromURL",
}

export default function UploadForm({ allTags }: { allTags: Array<RTag> }) {
  const [_, formAction] = useFormState(handleUploadForm, null);
  const [fromSource, setFromSource] = useState<FromSourceState>(
    FromSourceState.FROMDISC,
  );
  const [stagedTags, setStagedTags] = useState<Array<string>>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isError, setError] = useState<boolean>(false);

  const allowedFormats = getAllowedFormats();
  const availableTags = allTags
    .filter((tag) => !stagedTags.includes(tag.name))
    .map((tag) => (
      <span
        key={tag.id}
        onClick={() => {
          setStagedTags((prev) => [...new Set([...prev, tag.name])]);
        }}
        className="bg-primary p-1 text-tertiary"
      >
        {tag.name}
      </span>
    ));

  const listStagedTags = stagedTags.map((tag) => (
    <span key={tag} className="bg-primary p-1 text-tertiary">
      {tag}
    </span>
  ));

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (isFormatAllowed(file)) {
        setSelectedFile(file);
      } else {
        event.target.value = "";
        setError(true);
      }
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <form
      action={formAction}
      className="flex w-full flex-col items-center gap-4"
    >
      <div className="flex flex-col items-center gap-4">
        <ul className="flex flex-row shadow-xl">
          <li
            className={`${fromSource === FromSourceState.FROMDISC ? "bg-primary" : "bg-secondary"} rounded-l-lg p-2 text-quaternary`}
            onClick={() => {
              setFromSource(FromSourceState.FROMDISC);
            }}
          >
            From disc
          </li>
          <li
            className={`${fromSource === FromSourceState.FROMURL ? "bg-primary" : "bg-secondary"} rounded-r-lg p-2 text-quaternary`}
            onClick={() => {
              setFromSource(FromSourceState.FROMURL);
            }}
          >
            From URL
          </li>
        </ul>

        <div>
          {fromSource === FromSourceState.FROMDISC ? (
            <>
              <label className="sr-only" htmlFor="upload">
                Upload file
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg  bg-secondary text-quaternary focus:outline-none"
                aria-describedby="upload_help"
                id="upload"
                type="file"
                onChange={handleFileInput}
              />
              <p
                className={`${isError ? "text-xl text-red-500" : "text-sm text-secondary"} text-center`}
                id="upload_help"
              >
                {isError
                  ? [">".repeat(5), allowedFormats, "<".repeat(5)].join(" ")
                  : allowedFormats}
              </p>
            </>
          ) : (
            <input type="url" name="url" />
          )}
        </div>
      </div>

      <hr className="w-11/12 border-b border-primary" />

      <div className="w-full shadow-xl">
        <div className="flex flex-col gap-2 rounded-t-xl border-b border-primary bg-tertiary p-4">
          <h1 className="text-2xl text-primary">Staged tags:</h1>
          <p className="flex flex-row flex-wrap gap-3">
            {stagedTags.length != 0 ? (
              listStagedTags
            ) : (
              <span className="text-quaternary">
                New reply require at least one tag!
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-b-xl bg-secondary p-4">
          <h1 className="text-2xl text-quaternary">All tags:</h1>
          <p className="flex flex-row flex-wrap gap-3">{availableTags}</p>
        </div>

        <input type="hidden" name="tags" value={stagedTags} />
      </div>

      <button
        type="submit"
        className={`${stagedTags.length == 0 || selectedFile == null ? "bg-secondary" : "bg-primary"} rounded-xl p-4 text-xl shadow-xl`}
        disabled={stagedTags.length == 0 || selectedFile == null}
      >
        {stagedTags.length == 0 || selectedFile == null
          ? "Choose a file & tags"
          : "Upload a new reply!"}
      </button>
    </form>
  );
}
