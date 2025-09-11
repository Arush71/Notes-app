"use client";
import clsx from "clsx";
import { useState } from "react";
import { NoteEdit } from "./NoteEdit";
import { NotesSidebar } from "./NotesSidebar";
import { useNotes } from "~/hooks/useNotes";
import { useAddNote } from "~/hooks/useAddNote";

export const NotesMain = ({ userId }: { userId: string }) => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const { data: notes } = useNotes();
  const [livePreview, setLivePreview] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const addNote = useAddNote(userId, setActiveNoteId);
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
            userId={userId}
            setLivePreview={setLivePreview}
            addNote={addNote}
            activeNote={activeNote}
          />
        </div>
      </div>
    </main>
  );
};
