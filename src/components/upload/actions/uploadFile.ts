import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

type ResultSuccess = { type: "success"; fileName: string };
type ResultError = { type: "error"; message: string };

export async function uploadFile(
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
