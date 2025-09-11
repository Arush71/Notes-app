import { and, eq } from "drizzle-orm";
import "server-only";
import { db } from "~/drizzle/db";
import { noteTable } from "~/drizzle/schema";

export const editNote = async (
  noteId: string,
  text: string,
  userId: string,
): Promise<boolean> => {
  if (noteId.trim() === "" || userId.trim() === "") return false;
  const note = await db
    .update(noteTable)
    .set({
      text: text,
    })
    .where(and(eq(noteTable.id, noteId), eq(noteTable.authorId, userId)))
    .returning({
      id: noteTable.id,
    });

  return note.length > 0;
};
