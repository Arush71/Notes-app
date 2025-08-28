"use client";
import clsx from "clsx";
import { useState, type Dispatch, type SetStateAction } from "react";
import { type noteType } from "~/data/test";
import { NoteEdit } from "./NoteEdit";
import { NotesSidebar } from "./NotesSidebar";
export interface NProps {
  activeNoteId: string | null;
  setActiveNoteId: Dispatch<SetStateAction<string | null>>;
  notes: noteType[];
  setNotes: Dispatch<SetStateAction<noteType[]>>;
  addNote: () => void;
}
export const NotesMain = () => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [notes, setNotes] = useState<noteType[]>([]);
  const [livePreview, setLivePreview] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const addNote = () => {
    const newNote: noteType = {
      id: crypto.randomUUID(),
      dateCreated: new Date(),
      text: "",
    };
    setNotes((prev) => [...prev, newNote]);
    setActiveNoteId(newNote.id);
  };
  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;
  return (
    <>
      <div className="flex w-1/5 min-w-64 flex-col border-r-[3px] border-zinc-800 shadow-2xl">
        <NotesSidebar
          livePreview={livePreview}
          notes={notes}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
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
          setLivePreview={setLivePreview}
          setNotes={setNotes}
          addNote={addNote}
          activeNote={activeNote}
          notes={notes}
          setActiveNoteId={setActiveNoteId}
        />
      </div>
    </>
  );
};
