import UploadForm from "@/components/upload/UploadForm";
import { GetAllTags } from "@/lib/db/queries";

export default async function Upload() {
  const allTags = await GetAllTags();
  return <UploadForm allTags={allTags} />;
}
