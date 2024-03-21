import { auth } from "@/auth";
import { getAllTags } from "@/lib/db/queries";
import LoginRequired from "@/components/common/LoginRequired";
import UploadForm from "@/components/upload/UploadForm";

export default async function Upload() {
  const session = await auth();
  const allTags = await getAllTags();
  return (
    <>
      {session && session.user?.name ? (
        <UploadForm allTags={allTags} username={session.user.name} />
      ) : (
        <LoginRequired action="add reply" />
      )}
    </>
  );
}
