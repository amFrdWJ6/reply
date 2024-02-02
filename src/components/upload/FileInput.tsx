import { ChangeEvent } from "react";
import { getAllowedFormats } from "@/lib/utils";

export default function FileInput({
  handleFileInput,
  isError,
}: {
  handleFileInput: (event: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
}) {
  const allowedFormats = getAllowedFormats();
  return (
    <>
      <label className="sr-only" htmlFor="upload">
        Upload file
      </label>
      <input
        type="file"
        name="upload"
        id="upload"
        aria-describedby="upload_help"
        onChange={handleFileInput}
        className="block w-full cursor-pointer rounded-lg bg-secondary text-quaternary file:border-0 file:bg-primary file:p-2"
        required
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
  );
}
