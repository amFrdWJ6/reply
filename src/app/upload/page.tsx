import { auth } from "@/lib/auth";
import { GetAllTags } from "@/lib/db/queries";
import LoginRequired from "@/components/common/LoginRequired";
import UploadForm from "@/components/upload/UploadForm";

export default async function Upload() {
  const session = await auth();
  const allTags = await GetAllTags();
  return (
    <>
      {session ? (
        <UploadForm allTags={allTags} />
      ) : (
        <LoginRequired action="add reply" />
      )}
    </>
  );
}
