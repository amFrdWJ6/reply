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

  // Get reply rows with their tags
  return db
    .select({
      id: tblReply.id,
      fileName: tblReply.fileName,
      tags: sql`GROUP_CONCAT(${tblTag.name})`,
    })
    .from(tblTagToPost)
    .innerJoin(tblReply, eq(tblTagToPost.reply_id, tblReply.id))
    .innerJoin(tblTag, eq(tblTagToPost.tag_id, tblTag.id))
    .where(inArray(tblReply.id, replyIDs))
    .groupBy(tblReply.id)
    .all();
}