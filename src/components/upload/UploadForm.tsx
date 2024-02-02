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
import URLInput from "./URLInput";
import Tags from "./Tags";

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
            <URLInput handleURLInput={handleURLInput} />
          )}
        </div>
      </div>

      <hr className="w-11/12 border-b border-primary" />

      <Tags
        stagedTags={stagedTags}
        availableTags={availableTags}
        listStagedTags={listStagedTags}
      />

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
