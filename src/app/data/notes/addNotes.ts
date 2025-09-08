import { db } from "~/drizzle/db";
import { noteTable } from "~/drizzle/schema";
import "server-only";
import { eq } from "drizzle-orm";
export const addNotes = (authorId: string) => {
  const note = db
    .insert(noteTable)
    .values({
      authorId,
      text: "",
    })
    .returning({
      id: noteTable.id,
      updatedAt: noteTable.updatedAt,
      text: noteTable.text,
    });
  return note;
};

export const deleteNote = (id: string) => {
  const note = db.delete(noteTable).where(eq(noteTable.id, id));
  return note;
};
