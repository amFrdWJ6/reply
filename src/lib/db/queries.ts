import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { tblReply, tblTag, tblTagToPost } from "./schema";
import { eq, inArray, sql } from "drizzle-orm";

const sqlite = new Database("data/reply.db");
const db = drizzle(sqlite);

export async function GetAllRepliesByTags(tags: Array<string>) {
  // Get reply.id rows, where tag.name is in array of tags
  const replyIDs = db
    .selectDistinct({ id: tblTagToPost.reply_id })
    .from(tblTagToPost)
    .innerJoin(tblTag, eq(tblTagToPost.tag_id, tblTag.id))
    .where(inArray(tblTag.name, tags))
    .all()
    .map((reply) => reply.id);

  if (replyIDs.length == 0) {
    return null;
  }

  // Get reply rows with their tags
  return db
    .select({
      id: tblReply.id,
      title: tblReply.title,
      fileName: tblReply.fileName,
      tags: sql<string>`GROUP_CONCAT(${tblTag.name})`,
    })
    .from(tblTagToPost)
    .innerJoin(tblReply, eq(tblTagToPost.reply_id, tblReply.id))
    .innerJoin(tblTag, eq(tblTagToPost.tag_id, tblTag.id))
    .where(inArray(tblReply.id, replyIDs))
    .groupBy(tblReply.id)
    .all();
}

export async function GetLatestReplies() {
  return db
    .select({
      id: tblReply.id,
      title: tblReply.title,
      fileName: tblReply.fileName,
      tags: sql<string>`GROUP_CONCAT(${tblTag.name})`,
    })
    .from(tblTagToPost)
    .innerJoin(tblReply, eq(tblTagToPost.reply_id, tblReply.id))
    .innerJoin(tblTag, eq(tblTagToPost.tag_id, tblTag.id))
    .groupBy(tblReply.id)
    .all();
}

export async function CreateTag(tags: { name: string }[]) {
  try {
    db.insert(tblTag).values(tags).run();
  } catch (error) {
    console.log("");
  }
}

export async function GetAllTags() {
  return db.select().from(tblTag).all();
}

export async function GetTagsIDs(tags: string[]) {
  return db.select().from(tblTag).where(inArray(tblTag.name, tags)).all();
}

export async function CreateReply(title: string, filePath: string) {
  const newReply: WReply = {
    title: title,
    fileName: filePath,
  };

  try {
    const res = db
      .insert(tblReply)
      .values(newReply)
      .returning({ id: tblReply.id })
      .get();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function AddTagsToReply(reply_id: number, tags: RTag[]) {
  const newTagsToReply: WTagToReply[] = tags.map((tag) => {
    return { reply_id: reply_id, tag_id: tag.id };
  });

  try {
    db.insert(tblTagToReply).values(newTagsToReply).run();
  } catch (error) {
    console.log(error);
  }
}
