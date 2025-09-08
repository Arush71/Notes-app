import { eq } from "drizzle-orm";
import "server-only";
import { db } from "~/drizzle/db";
import { noteTable } from "~/drizzle/schema";

export const getAllNotes = (authorId: string) => {
  const notes = db
    .select({
      id: noteTable.id,
      text: noteTable.text,
      updatedAt: noteTable.updatedAt,
    })
    .from(noteTable)
    .where(eq(noteTable.authorId, authorId));

  return notes;
};
