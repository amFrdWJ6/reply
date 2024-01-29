import axios from "axios";
import fs from "fs";
import { allowed_file_formats } from "./const";
import { unlink } from "fs/promises";

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

export const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;

async function checkContentLength(url: string) {
  await fetch(url, { method: "HEAD" })
    .then((response) => {
      try {
        const contentLength = response.headers.get("content-length");
        if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE_BYTES) {
          throw new Error("HEAD: File size exceeds the maximum allowed size.");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .catch((response) => {
      throw new Error(
        `HEAD: Failed to get file information. Status: ${response.status}`,
      );
    });
  // if (!response.ok) {
  //   throw new Error(
  //     `HEAD: Failed to get file information. Status: ${response.status}`,
  //   );
  // }
  // const contentLength = response.headers.get("content-length");
  // if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE_BYTES) {
  //   throw new Error("HEAD: File size exceeds the maximum allowed size.");
  // }
}

export async function DownloadFile(url: string, destSrc: string) {
  try {
    // checkContentLength(url);

    const response = await axios({
      method: "get",
      url: url,
      responseType: "stream",
    });

    const destStream = fs.createWriteStream(destSrc);
    let receivedSize = 0;
    response.data.on("data", (chunk: Buffer) => {
      receivedSize += chunk.length;

      console.log(receivedSize);

      if (receivedSize > MAX_FILE_SIZE_BYTES) {
        destStream.destroy();
        unlink(destSrc);
        throw new Error(
          "File size exceeds the maximum allowed size during download.",
        );
      }
    });

    response.data.pipe(destStream);

    await new Promise<void>((resolve, reject) => {
      response.data.on("end", resolve);
      destStream.on("error", reject);
    });
    console.log(`File downloaded successfully and saved at: ${destSrc}`);
  } catch (error) {
    console.error("Error downloading file:", error.message);
  }
}
