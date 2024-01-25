import TagForm from "@/components/tags/TagForm";
import { GetAllTags } from "@/lib/db/queries";
import { RTag } from "@/lib/db/schema";

export default async function Tags() {
  const allTags = await GetAllTags();
  const listTags = allTags
    .sort((a: RTag, b: RTag) => {
      return a.name.localeCompare(b.name);
    })
    .map((tag) => (
      <span key={tag.id} className="rounded-sm bg-white p-1">
        {tag.name}
      </span>
    ));

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-2xl">Available tags:</h1>
        <div className="flex flex-row flex-wrap gap-2 p-2">{listTags}</div>
      </div>
      <TagForm />
    </>
  );
}
