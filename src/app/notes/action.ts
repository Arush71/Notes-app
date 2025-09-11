"use server";

import type { Note, NotesReturnT } from "~/types/notes.types";
import { addNotes } from "../data/notes/addNotes";
import { editNote } from "../data/notes/editNote";

export const addNoteA = async (authorId: string): Promise<Note[]> => {
  try {
    const note = await addNotes(authorId);
    return note;
  } catch {
    throw new Error("Failed to add note");
  }
};

export const editNoteFn = async (
  userId: string,
  text: string,
  noteId: string,
) => {
  try {
    const editNoteB = await editNote(noteId, text, userId);
    if (!editNoteB) {
      throw new Error("Failed to edit the Note.");
    }
    console.log("note called");
  } catch {
    throw new Error("Failed to edit the Note.");
  }
};
