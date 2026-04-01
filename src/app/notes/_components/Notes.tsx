"use client";
import clsx from "clsx";
import { useState } from "react";
import { NoteEdit } from "./NoteEdit";
import { NotesSidebar } from "./NotesSidebar";
import { useNotes } from "~/hooks/useNotes";
import { useAddNote } from "~/hooks/useAddNote";

export const NotesMain = ({ userId }: { userId: string }) => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"sidebar" | "editor">("sidebar");

  const { data: notes } = useNotes();
  const [livePreview, setLivePreview] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const handleSetActiveNoteId = (id: string | null) => {
    setActiveNoteId(id);
    if (id) setMobileView("editor");
  };

  const addNote = useAddNote(userId, handleSetActiveNoteId);
  const activeNote = notes?.find((n) => n.id === activeNoteId) ?? null;
  return (
    <main className="h-screen">
      <div className="flex h-full">
        <div
          className={clsx(
            "flex flex-col border-r-[3px] border-zinc-800 shadow-2xl",
            "w-full md:w-1/5 md:min-w-64",
            mobileView === "sidebar" ? "flex" : "hidden md:flex",
          )}
        >
          <NotesSidebar
            livePreview={livePreview}
            activeNoteId={activeNoteId}
            setActiveNoteId={handleSetActiveNoteId}
            addNote={addNote}
          />
        </div>
        <div
          className={clsx(
            "flex-1 flex-col",
            {
              "items-center justify-center gap-4": !activeNote,
              "h-full items-center gap-3 pt-2.5": activeNote,
            },
            mobileView === "editor" ? "flex" : "hidden md:flex",
          )}
        >
          <NoteEdit
            userId={userId}
            setLivePreview={setLivePreview}
            addNote={addNote}
            activeNote={activeNote}
            onMobileBack={() => setMobileView("sidebar")}
          />
        </div>
      </div>
    </main>
  );
};
