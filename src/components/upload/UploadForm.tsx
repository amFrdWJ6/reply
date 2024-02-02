"use client";

import { handleUploadForm } from "@/lib/actions";
import { RTag } from "@/lib/db/schema";
import { getAllowedFormats, isFileFormatAllowed } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import UnpickedTag from "../common/UnpickedTag";
import StagedTag from "../common/StagedTag";
import TitleInput from "./TitleInput";
import SourceSelect from "./SourceSelect";
import FileInput from "./FileInput";

export enum SourceType {
  LOCAL = "local",
  URL = "url",
}

export default function UploadForm({ allTags }: { allTags: Array<RTag> }) {
  const [_, formAction] = useFormState(handleUploadForm, null);
  const [sourceType, setSourceType] = useState<SourceType>(SourceType.LOCAL);
  const [stagedTags, setStagedTags] = useState<Array<string>>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedURL, setSelectedURL] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);

  const allowedFormats = getAllowedFormats();
  const availableTags = allTags
    .filter((tag) => !stagedTags.includes(tag.name))
    .map((tag) => (
      <UnpickedTag
        key={tag.name}
        tag={tag}
        onClick={() => {
          setStagedTags((prev) => [...new Set([...prev, tag.name])]);
        }}
      />
    ));

  const listStagedTags = stagedTags.map((tag) => (
    <StagedTag
      key={tag}
      tag={tag}
      onClick={() => {
        setStagedTags((prev) => [
          ...prev.filter((stagedTag) => stagedTag !== tag),
        ]);
      }}
    />
  ));

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (isFileFormatAllowed(file)) {
        setSelectedFile(file);
      } else {
        event.target.value = "";
        setError(true);
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleURLInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedURL(event.target.value);
  };

  return (
    <form
      action={formAction}
      className="flex w-full flex-col items-center gap-4"
    >
      <TitleInput />
      <hr className="w-11/12 border-b border-primary" />
      <div className="flex w-1/2 flex-col items-center gap-4">
        <SourceSelect sourceType={sourceType} setSourceType={setSourceType} />

        <div className="w-full">
          {sourceType === SourceType.LOCAL ? (
            <FileInput handleFileInput={handleFileInput} isError={isError} />
          ) : (
            <>
              <label className="sr-only" htmlFor="url">
                URL for image to upload
              </label>
              <input
                type="url"
                name="upload"
                id="url"
                aria-describedby="url_help"
                onChange={handleURLInput}
                placeholder="http://urfavsite.dev/hilariousmeme.webp"
                className="w-full rounded-md bg-secondary p-2 placeholder:text-quaternary focus:outline-none focus:ring-0"
                required
              />
              <p className="text-center text-sm text-secondary" id="url_help">
                {allowedFormats}
              </p>
            </>
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
        className={`${stagedTags.length == 0 || (selectedFile == null && selectedURL == "") ? "bg-secondary" : "bg-primary"} rounded-xl p-4 text-xl shadow-xl`}
        disabled={
          stagedTags.length == 0 || (selectedFile == null && selectedURL == "")
        }
      >
        {stagedTags.length == 0 || (selectedFile == null && selectedURL == "")
          ? "Choose a file & tags"
          : "Upload a new reply!"}
      </button>
    </form>
  );
}
