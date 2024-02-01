import { redirect } from "next/navigation";
import {
  GetAllRepliesByTags,
  GetAllTags,
  GetLatestReplies,
} from "@/lib/db/queries";
import Reply from "@/components/Reply";

async function ValidateTagsFromURLQuery(searchParamsTags: string) {
  const allTags = await GetAllTags();
  const availableTags = allTags.map((tag) => tag.name);
  const queriedTags = searchParamsTags.split(",");

  const validatedTags = queriedTags.filter((tag) =>
    availableTags.includes(tag),
  );

  if (validatedTags.length == 0) {
    redirect("/");
  }
  return validatedTags;
}

export default async function ShowQueriedReplies({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const replies =
    searchParams.tags != undefined
      ? await GetAllRepliesByTags(
          await ValidateTagsFromURLQuery(searchParams.tags),
        )
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

  const listOfReplies = replies.map((reply) => (
    <Reply key={reply.id} reply={reply} />
  ));

  return (
    <div className="columns-1 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {listOfReplies}
    </div>
  );
}
