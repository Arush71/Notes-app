"use client";
import clsx from "clsx";
import { useState, type Dispatch, type SetStateAction } from "react";
import { type noteType } from "~/data/test";
import { NoteEdit } from "./NoteEdit";
import { NotesSidebar } from "./NotesSidebar";
import type { Note } from "~/types/notes.types";
import { useNotes } from "~/hooks/useNotes";
import { useAddNote } from "~/hooks/useAddNote";

export interface NProps {
  activeNoteId: string | null;
  setActiveNoteId: Dispatch<SetStateAction<string | null>>;
  initialNotes: Note[];
  setNotes: Dispatch<SetStateAction<noteType[]>>;
  addNote: () => void;
}

export const NotesMain = ({ userId }: { userId: string }) => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const { data: notes } = useNotes();
  const [livePreview, setLivePreview] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const addNote = useAddNote(userId);
  const activeNote = notes?.find((n) => n.id === activeNoteId) ?? null;
  return (
    <main className="h-screen">
      <div className="flex h-full">
        <div className="flex w-1/5 min-w-64 flex-col border-r-[3px] border-zinc-800 shadow-2xl">
          <NotesSidebar
            livePreview={livePreview}
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
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
            addNote={addNote}
            activeNote={activeNote}
            setActiveNoteId={setActiveNoteId}
          />
        </div>
      </div>
    </main>
  );
};
