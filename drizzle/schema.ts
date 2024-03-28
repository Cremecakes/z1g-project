import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const app = pgTable("app", {
  name: text("name").notNull().unique(),
  description: text("description"),
  url: text("url").notNull(),
  image: text("image").notNull(),
});
export const user = pgTable("user", {
  email: text("email").notNull().unique().primaryKey(),
  isAdmin: boolean("is_admin").notNull().default(false),
});
