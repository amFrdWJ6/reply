import axios, { AxiosError, AxiosResponse } from "axios";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { DOWNLOAD_TIMEOUT, MAX_FILE_SIZE_BYTES } from "@/lib/const";

type ResultSuccess = { type: "success"; fileName: string };
type ResultError = { type: "error"; message: string };

const isAxiosTimeoutError = (error: any): error is AxiosError => {
  return axios.isAxiosError(error) && error.code === "ECONNABORTED";
};

export async function downloadFile(
  url: string,
  destDir: string,
): Promise<ResultSuccess | ResultError> {
  const controller = new AbortController();
  const signal = controller.signal;
  const fileName = [uuidv4(), url.split(".").pop()].join(".");
  const destPath = `${destDir}/${fileName}`;
  const destStream = createWriteStream(destPath);
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
