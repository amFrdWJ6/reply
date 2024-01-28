import { allowed_file_formats } from "./const";

export async function ImageLoader(
  src: string,
  width: number,
  quality: number = 75,
) {
  return `http://localhost:3000/uploads/${src}?w=${width}&q=${quality}`;
}

export function isFormatAllowed(file: File) {
  return Array.from(allowed_file_formats.values()).some(
    (item) => item === file.type,
  );
}

export function getAllowedFormats() {
  return Array.from(allowed_file_formats.values())
    .map((format) => format.split("/")[1])
    .join(" / ");
}
