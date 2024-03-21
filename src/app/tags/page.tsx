import { auth } from "@/auth";
import { GetAllTags } from "@/lib/db/queries";
import { RTag } from "@/lib/db/schema";
import TagForm from "@/components/tags/TagForm";
import LoginRequired from "@/components/common/LoginRequired";

export default async function Tags() {
  const session = await auth();
  const allTags = await GetAllTags();
  const listTags = allTags
    .sort((a: RTag, b: RTag) => {
      return a.name.localeCompare(b.name);
    })
    .map((tag) => (
      <span
        key={tag.id}
        className="rounded-sm border border-secondary bg-primary p-1 text-tertiary"
      >
        {tag.name}
      </span>
    ));

  return (
    <>
      <div className="flex w-full flex-col">
        <h1 className="text-2xl text-tertiary">Available tags:</h1>
        <div className="flex flex-row flex-wrap gap-2 p-2">{listTags}</div>
      </div>
      {session ? <TagForm /> : <LoginRequired action="add tags" />}
    </>
  );
}
