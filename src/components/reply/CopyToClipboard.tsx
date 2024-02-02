"use client";

import { CopyLinkIcon } from "../icons/svg";

export default function CopyToClipboard({ url }: { url: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
      }}
      title="Copy to Clipboard"
    >
      <CopyLinkIcon />
    </button>
  );
}
