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

  const file = [process.env.UPLOADS_DIR, fileName].join("/");
  return await access(file, constants.F_OK)
    .then(async () => {
      return new NextResponse(await readFile(file));
    })
    .catch(async () => {
      return NextResponse.json(`File [${fileName}] does not exsits`, {
        status: 404,
      });
    });
}
