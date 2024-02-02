import { ChangeEvent } from "react";
import { getAllowedFormats } from "@/lib/utils";

export default function URLInput({
  handleURLInput,
}: {
  handleURLInput: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const allowedFormats = getAllowedFormats();
  return (
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
  );
}
