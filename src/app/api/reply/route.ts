import { getContentType } from "@/lib/utils/server";
import { access, constants, readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get("f");
  if (fileName == null) {
    return NextResponse.json(
      "No file provided. API call should be /api/reply?f=file.png",
      { status: 400 },
    );
  }

  const destDir = process.env.APP_UPLOADS_DIR;
  if (destDir == undefined) {
    throw new Error("Missing ENV variable: APP_UPLOADS_DIR");
  }

  const file = [destDir, fileName].join("/");
  const contentType = await getContentType(fileName.split(".").pop());

  return await access(file, constants.F_OK)
    .then(async () => {
      return new NextResponse(await readFile(file), {
        headers: { "content-type": contentType },
      });
    })
    .catch(async () => {
      return NextResponse.json(`File [${fileName}] does not exsits`, {
        status: 404,
      });
    });
}
