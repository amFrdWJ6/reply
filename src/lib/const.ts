export const placeholders = [
  "Clickity, clickity, CLICK! Tagity, Tagity, TAG!",
  "Click me, stranger! I'll show you my tags.",
  "This is a not a random placeholder. Keep moving. Don't Click.",
  "watch?v=dQw4w9WgXcQ",
];

export const allowed_file_formats = new Map<string, string>([
  ["webp", "image/webp"],
  ["webm", "video/webm"],
  ["jpg", "image/jpeg"],
  ["png", "image/png"],
  ["gif", "image/gif"],
]);

export const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;
export const DOWNLOAD_TIMEOUT = 5000;
export const DEFAULT_CONTENT_TYPE = "application/octet-stream";
