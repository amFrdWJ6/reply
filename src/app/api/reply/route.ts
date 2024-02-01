import { access, constants, readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get("f");
  if (fileName == null) {
    return NextResponse.json("No file provided", { status: 400 });
  }

  return await access(["public/uploads", fileName].join("/"), constants.F_OK)
    .then(async () => {
      return new NextResponse(
        await readFile(["public/uploads", fileName].join("/")),
      );
    })
    .catch(async () => {
      return NextResponse.json("File does not exsits", { status: 404 });
    });
}
