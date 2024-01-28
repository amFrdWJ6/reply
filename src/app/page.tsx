import { redirect } from "next/navigation";
import {
  GetAllRepliesByTags,
  GetAllTags,
  GetLatestReplies,
} from "@/lib/db/queries";
import Reply from "@/components/Reply";

async function CheckURLTags(searchedTags: string) {
  const allTags = await GetAllTags();
  const validatedTags = allTags
    .filter((tag) => searchedTags.split(",").includes(tag.name))
    .map((tag) => tag.name);

  if (validatedTags.length == 0) {
    redirect("/");
  }
  return validatedTags;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const replies =
    searchParams.tags != undefined
      ? await GetAllRepliesByTags(await CheckURLTags(searchParams.tags))
      : await GetLatestReplies();

  if (replies == null) {
    return (
      <p className="text-tertiary">
        H-h. There is a <span className="text-6xl text-primary">null</span> of
        replies with those tags.
        <p>Did you break it ?! ಠ_ಠ</p>
      </p>
    );
  }

  const listReplis = replies.map((reply) => (
    <Reply key={reply.id} reply={reply} />
  ));

  return (
    <div className="columns-1 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {listReplis}
    </div>
  );
}
