import { redirect } from "next/navigation";
import {
  getAllRepliesByTags,
  getAllTags,
  getLatestReplies,
} from "@/lib/db/queries";
import Reply from "@/components/Reply";

async function validateTagsFromURLQuery(searchParamsTags: string) {
  const allTags = await getAllTags();
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

async function NullMessage() {
  return (
    <div className="flex flex-col justify-start">
      <p className="text-tertiary">
        H-h. There is a <span className="text-6xl text-primary">null</span> of
        replies with those tags.
      </p>
      <p>Did you break it ?! ಠ_ಠ</p>
    </div>
  );
}

export default async function ShowQueriedReplies({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const replies =
    searchParams.tags != undefined
      ? await getAllRepliesByTags(
          await validateTagsFromURLQuery(searchParams.tags),
        )
      : await getLatestReplies();

  if (replies == null) {
    return <NullMessage />;
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
