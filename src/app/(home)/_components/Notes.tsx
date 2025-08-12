"use client";
import clsx from "clsx";
import { useState, type Dispatch, type SetStateAction } from "react";
import { type noteType } from "~/data/test";
import { NoteEdit } from "./NoteEdit";
import { NotesSidebar } from "./NotesSidebar";
export interface NProps {
  activeNote: noteType | null;
  setActiveNote: Dispatch<SetStateAction<noteType | null>>;
  notes: noteType[];
  setNotes: Dispatch<SetStateAction<noteType[]>>;
  addNote: () => void;
}
export const NotesMain = () => {
  const [activeNote, setActiveNote] = useState<noteType | null>(null);
  const [notes, setNotes] = useState<noteType[]>([]);
  const addNote = () => {
    const newNote: noteType = {
      id: crypto.randomUUID(),
      dateCreated: new Date(),
      text: "",
    };
    setNotes((prev) => [...prev, newNote]);
    setActiveNote(newNote);
  };
  return (
    <>
      <div className="flex w-1/5 min-w-64 flex-col border-r-[3px] border-zinc-800 shadow-2xl">
        <NotesSidebar
          notes={notes}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          setNotes={setNotes}
          addNote={addNote}
        />
      </div>
      <div
        className={clsx("flex flex-1 flex-col", {
          "items-center justify-center gap-4": !activeNote,
          "h-full items-center gap-3 pt-2.5": activeNote,
        })}
      >
        <NoteEdit
          setNotes={setNotes}
          addNote={addNote}
          activeNote={activeNote}
        />
      </div>
    </>
  );
};
