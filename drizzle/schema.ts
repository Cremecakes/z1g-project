import { pgTable, text } from "drizzle-orm/pg-core";

export const app = pgTable("app", {
  name: text("name").notNull().unique(),
  description: text("description"),
  url: text("url"),
  image: text("image").notNull(),
});
