"use server";

import type { Note, NotesReturnT } from "~/types/notes.types";
import { addNotes } from "../data/notes/addNotes";

export const addNoteA = async (authorId: string): Promise<Note[]> => {
  try {
    const note = await addNotes(authorId);
    return note;
  } catch {
    throw new Error("Failed to add note");
  }
};
