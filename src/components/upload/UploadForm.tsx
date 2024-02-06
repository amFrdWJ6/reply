"use client";

import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { handleUploadForm } from "@/lib/actions";
import { RTag } from "@/lib/db/schema";
import { isFileFormatAllowed } from "@/lib/utils";
import FileInput from "./form/FileInput";
import SourceSelect from "./form/SourceSelect";
import StagedTag from "../common/form/StagedTag";
import Tags from "./form/Tags";
import TitleInput from "./form/TitleInput";
import UnpickedTag from "../common/form/UnpickedTag";
import URLInput from "./form/URLInput";
import SubmitUploadButton from "./form/SubmitUploadButton";

export enum SourceType {
  LOCAL = "local",
  URL = "url",
}

export default function UploadForm({ allTags }: { allTags: Array<RTag> }) {
  const [formState, formAction] = useFormState(handleUploadForm, null);
  const [sourceType, setSourceType] = useState<SourceType>(SourceType.LOCAL);
  const [stagedTags, setStagedTags] = useState<Array<string>>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedURL, setSelectedURL] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const { data: session } = useSession();
  const username: string = session!.user!.name!;

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
      <p
        aria-live="polite"
        className="w-full text-center text-2xl text-red-500"
      >
        {formState?.message}
      </p>
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
      <input type="hidden" name="user" value={username} />

      <SubmitUploadButton
        stagedTags={stagedTags}
        selectedFile={selectedFile}
        selectedURL={selectedURL}
      />
    </form>
  );
}
