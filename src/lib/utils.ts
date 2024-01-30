import axios, { AxiosError, AxiosResponse } from "axios";
import fs from "fs";
import {
  DOWNLOAD_TIMEOUT,
  MAX_FILE_SIZE_BYTES,
  allowed_file_formats,
} from "./const";
import { unlink } from "fs/promises";

export async function ImageLoader(
  src: string,
  width: number,
  quality: number = 75,
) {
  return `http://localhost:3000/uploads/${src}?w=${width}&q=${quality}`;
}

export function isFileFormatAllowed(file: File) {
  return Array.from(allowed_file_formats.values()).some(
    (item) => item === file.type,
  );
}

export function getAllowedFormats() {
  return Array.from(allowed_file_formats.values())
    .map((format) => format.split("/")[1])
    .join(" / ");
}

// Download
type DownloadResultSuccess = { type: "success"; filePath: string };
type DownloadResultError = { type: "error"; message: string };

const isAxiosTimeoutError = (error: any): error is AxiosError => {
  return axios.isAxiosError(error) && error.code === "ECONNABORTED";
};

export async function DownloadFile(
  url: string,
  destDir: string,
): Promise<DownloadResultSuccess | DownloadResultError> {
  const controller = new AbortController();
  const signal = controller.signal;
  const fileName = "img6.jpg"; // TODO: change to UUID when dev-upload is not WIP
  const destPath = `${destDir}/${fileName}`;
  const destStream = fs.createWriteStream(destPath);
  let receivedBytes = 0;

  try {
    const response: AxiosResponse<NodeJS.ReadableStream> = await axios.get(
      url,
      { responseType: "stream", signal, timeout: DOWNLOAD_TIMEOUT },
    );

    response.data.on("data", (chunk: Buffer) => {
      receivedBytes += chunk.length;

      if (receivedBytes > MAX_FILE_SIZE_BYTES) {
        controller.abort();
      }
    });

    response.data.pipe(destStream);

    const downloadPromise = new Promise<
      DownloadResultSuccess | DownloadResultError
    >((resolve, reject) => {
      destStream.on("finish", () => {
        resolve({ type: "success", filePath: destPath });
      });

      signal.addEventListener("abort", () => {
        destStream.destroy();
        unlink(destPath);
        reject({
          type: "error",
          message: "Download aborted due to exceeding file size limit.",
        });
      });

      destStream.on("error", (error) => {
        console.error("Error writing to destination stream:", error.message);
        // unlink(destPath);
        reject({
          type: "error",
          message: "An error occurred during file writing.",
        });
      });
    });

    await Promise.all([downloadPromise]);

    return downloadPromise;
  } catch (error) {
    if (isAxiosTimeoutError(error)) {
      await unlink(destPath);
    }
    return {
      type: "error",
      message: (error as Error).message || "An unexpected error",
    };
  }
}
