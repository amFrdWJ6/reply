import axios, { AxiosError, AxiosResponse } from "axios";
import fs from "fs";
import {
  DOWNLOAD_TIMEOUT,
  MAX_FILE_SIZE_BYTES,
  allowed_file_formats,
} from "./const";
import { unlink, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

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

// Download
type ResultSuccess = { type: "success"; fileName: string };
type ResultError = { type: "error"; message: string };

const isAxiosTimeoutError = (error: any): error is AxiosError => {
  return axios.isAxiosError(error) && error.code === "ECONNABORTED";
};

export async function DownloadFile(
  url: string,
  destDir: string,
): Promise<ResultSuccess | ResultError> {
  const controller = new AbortController();
  const signal = controller.signal;
  const fileName = [uuidv4(), url.split(".").pop()].join(".");
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

    const downloadPromise = new Promise<ResultSuccess | ResultError>(
      (resolve, reject) => {
        destStream.on("finish", () => {
          resolve({ type: "success", fileName: fileName });
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
      },
    );

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

export async function UploadFile(
  file: File,
  destDir: string,
): Promise<ResultSuccess | ResultError> {
  const fileName = [uuidv4(), file.type.split("/").pop()].join(".");
  const destFilePath = `${destDir}/${fileName}`;

  return await writeFile(destFilePath, Buffer.from(await file.arrayBuffer()))
    .then(() => {
      return { type: "success", fileName: fileName } as ResultSuccess;
    })
    .catch((err: Error) => {
      console.log(err);
      return { type: "error", message: err.message } as ResultError;
    });
}
