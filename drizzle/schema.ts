

import { createInsertSchema } from "drizzle-zod";
import { pgTable, unique, text, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const app = pgTable("app", {
	name: text("name").primaryKey().notNull(),
	description: text("description"),
	url: text("url").notNull(),
	image: text("image").notNull(),
},
(table) => {
	return {
		appNameUnique: unique("app_name_unique").on(table.name),
	}
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	isAdmin: boolean("is_admin").default(false).notNull(),
});
export const insertAppSchema = createInsertSchema(app);
