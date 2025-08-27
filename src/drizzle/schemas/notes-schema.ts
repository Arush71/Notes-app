import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const noteTable = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("content"),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const NotesTableRelations = relations(noteTable, ({ one }) => ({
  author: one(user, { fields: [noteTable.authorId], references: [user.id] }),
}));
