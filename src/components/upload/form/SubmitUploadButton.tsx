"use client";

import { useFormStatus } from "react-dom";

export default function SubmitUploadButton({
  stagedTags,
  selectedFile,
  selectedURL,
}: {
  stagedTags: Array<string>;
  selectedFile: File | null;
  selectedURL: string;
}) {
  const { pending } = useFormStatus();
  const upload_msg = pending ? "Processing..." : "Upload a new reply!";

  return (
    <button
      type="submit"
      className={`${stagedTags.length == 0 || (selectedFile == null && selectedURL == "") ? "bg-secondary" : "bg-primary"} rounded-xl p-4 text-xl shadow-xl`}
      disabled={
        stagedTags.length == 0 || (selectedFile == null && selectedURL == "")
      }
    >
      {stagedTags.length == 0 || (selectedFile == null && selectedURL == "")
        ? "Choose a file & tags"
        : upload_msg}
    </button>
  );
}
