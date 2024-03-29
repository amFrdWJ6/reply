import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  RTag,
  WLog,
  WReply,
  WTagToReply,
  tblLog,
  tblReply,
  tblTag,
  tblTagToReply,
} from "./schema";
import { and, desc, eq, inArray, isNotNull, sql } from "drizzle-orm";

const sqlite = new Database("data/reply.db");
const db = drizzle(sqlite);

export async function getAllRepliesByTags(tags: Array<string>) {
  // Get reply.id rows, where tag.name is in array of tags
  const replyIDs = db
    .selectDistinct({ id: tblTagToReply.reply_id })
    .from(tblTagToReply)
    .innerJoin(tblTag, eq(tblTagToReply.tag_id, tblTag.id))
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
    .from(tblTagToReply)
    .innerJoin(tblReply, eq(tblTagToReply.reply_id, tblReply.id))
    .innerJoin(tblTag, eq(tblTagToReply.tag_id, tblTag.id))
    .where(inArray(tblReply.id, replyIDs))
    .groupBy(tblReply.id)
    .all();
}

export async function getLatestReplies() {
  return db
    .select({
      id: tblReply.id,
      title: tblReply.title,
      fileName: tblReply.fileName,
      tags: sql<string>`GROUP_CONCAT(${tblTag.name})`,
    })
    .from(tblTagToReply)
    .innerJoin(tblReply, eq(tblTagToReply.reply_id, tblReply.id))
    .innerJoin(tblTag, eq(tblTagToReply.tag_id, tblTag.id))
    .groupBy(tblReply.id)
    .all();
}

export async function createTag(tags: { name: string }[]) {
  try {
    return db.insert(tblTag).values(tags).returning({ id: tblTag.id }).all();
  } catch (error) {
    console.log("Failed to create tags: ", tags);
  }
}

export async function getAllTags() {
  return db.select().from(tblTag).all();
}

export async function getTagsIDs(tags: string[]) {
  return db.select().from(tblTag).where(inArray(tblTag.name, tags)).all();
}

export async function createReply(title: string, filePath: string) {
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

export async function addTagsToReply(reply_id: number, tags: RTag[]) {
  const newTagsToReply: WTagToReply[] = tags.map((tag) => {
    return { reply_id: reply_id, tag_id: tag.id };
  });

  try {
    return db.insert(tblTagToReply).values(newTagsToReply).returning().all();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getLogs(page: number, limit: number = 50) {
  return db
    .select({
      id: tblLog.id,
      who: tblLog.who,
      action: tblLog.action,
      when: tblLog.when,
      tag: tblTag.name,
      file: tblReply.fileName,
    })
    .from(tblLog)
    .leftJoin(
      tblReply,
      and(isNotNull(tblLog.reply_id), eq(tblLog.reply_id, tblReply.id)),
    )
    .leftJoin(
      tblTag,
      and(isNotNull(tblLog.tag_id), eq(tblLog.tag_id, tblTag.id)),
    )
    .limit(limit)
    .offset(page * limit)
    .orderBy(desc(tblLog.id))
    .all();
}

export async function createLog(
  who: string,
  action: string,
  id: number | { id: number }[],
) {
  if (Array.isArray(id) && id.length > 0) {
    for (let tag of id) {
      const newLog: WLog = {
        who: who,
        action: action,
        tag_id: tag.id,
      };

      try {
        db.insert(tblLog).values(newLog).run();
      } catch (error) {
        console.log(error);
      }
    }
  } else if (typeof id === "number") {
    const newLog: WLog = {
      who: who,
      action: action,
      reply_id: id,
    };

    try {
      db.insert(tblLog).values(newLog).run();
    } catch (error) {
      console.log(error);
    }
  } else {
    console.error("ID parameter was not provided for createLog function");
  }
}
