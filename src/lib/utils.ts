import { allowed_file_formats } from "./const";

export async function ImageLoader(src: string) {
  return `http://localhost:3000/api/reply?f=${src}`;
}

export function isFileFormatAllowed(file: File) {
  return Array.from(allowed_file_formats.values()).some(
    (item) => item === file.type,
  );
}

export function isURLFileFormatAllowed(file: string) {
  const format = file.split(".").pop();
  return format ? allowed_file_formats.has(format) : false;
}

export function getAllowedFormats() {
  return Array.from(allowed_file_formats.values())
    .map((format) => format.split("/")[1])
    .join(" / ");
}
