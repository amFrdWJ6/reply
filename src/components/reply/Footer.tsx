"use client";

import { useState } from "react";
import CopyToClipboard from "./CopyToClipboard";
import Tags from "./Tags";

export default function Footer({
  url,
  tags,
}: {
  url: string;
  tags: Array<string>;
}) {
  const [areTagsOpen, setTagsState] = useState<boolean>(false);

  return (
    <>
      <div className="bg-tertiary text-primary flex flex-row justify-between px-2 py-1">
        <CopyToClipboard url={url} />

        <button onClick={() => setTagsState(!areTagsOpen)}>Show Tags</button>
      </div>
      {areTagsOpen && <Tags tags={tags} />}
    </>
  );
}