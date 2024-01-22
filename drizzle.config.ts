import type { Config } from "drizzle-kit";

export default {
  schema: "./src/app/lib/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "data/reply.db",
  },
} satisfies Config;
