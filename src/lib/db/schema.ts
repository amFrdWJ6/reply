import { InferInsertModel } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const tblReply = sqliteTable("reply", {
  id: integer("id", { mode: "number" }).primaryKey(),
  fileName: text("file_name").notNull(),
  title: text("title").notNull(),
});
export type WReply = InferInsertModel<typeof tblReply>;

export const tblTag = sqliteTable("tag", {
  id: integer("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull().unique(),
});
export type WTag = InferInsertModel<typeof tblTag>;

export const tblTagToPost = sqliteTable(
  "tag_top_post",
  {
    reply_id: integer("reply_id", { mode: "number" })
      .notNull()
      .references(() => tblReply.id),
    tag_id: integer("tag_id", { mode: "number" })
      .notNull()
      .references(() => tblTag.id),
  },
  (tbl) => {
    return {
      pk: primaryKey({
        name: "tag_to_post_PK",
        columns: [tbl.reply_id, tbl.tag_id],
      }),
    };
  },
);
export type WTagToPost = InferInsertModel<typeof tblTagToPost>;
