import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import { addTagsToReply, createLog, createReply } from "@/lib/db/queries";
import { RTag } from "@/lib/db/schema";

export async function createDBRecords(
  title: string,
  fileName: string,
  user: string,
  tags: RTag[],
) {
  const reply = await createReply(title, fileName);
  if (reply != null) {
    const tagsToReply = await addTagsToReply(reply.id, tags);
    if (tagsToReply == null) {
      console.log(`New reply without tags added. Reply ID: ${reply.id}`);
      return {
        type: "error",
        message: `Failed to add tags to your new reply`,
      };
    }

    await createLog(user, "added reply", reply.id);

    revalidatePath("/");
    revalidatePath("/log");
    redirect("/");
  } else {
    await unlink(fileName);
    return {
      type: "error",
      message: `Failed to create DB record for new Reply`,
    };
  }
}
