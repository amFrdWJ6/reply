import { auth } from "@/auth";
import { getAllTags } from "@/lib/db/queries";
import { RTag } from "@/lib/db/schema";
import TagForm from "@/components/tags/TagForm";
import LoginRequired from "@/components/common/LoginRequired";

export default async function Tags() {
  const session = await auth();
  const allTags = await getAllTags();
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
      {session && session.user?.name ? (
        <TagForm username={session.user.name} />
      ) : (
        <LoginRequired action="add tags" />
      )}
    </>
  );
}
