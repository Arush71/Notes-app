import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import type { NProps } from "./Notes";
import debounce from "lodash.debounce";

export const NoteEdit = ({
  activeNote,
  addNote,
  setNotes,
}: Omit<NProps, "setActiveNote" | "notes">) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const handleInput = () => {
    if (editorRef.current === null) return;
    console.log(editorRef.current.innerText);

    setNotes((prev) =>
      prev.map((note) =>
        note.id === activeNote?.id
          ? { ...note, text: editorRef.current?.innerText ?? "" }
          : note,
      ),
    );
  };
  const debouncedHandleInput = debounce(() => handleInput(), 200);
  // fix debounce behaviour when it switches activeNotes via hooking it up to a current referance.

  useEffect(() => {
    if (activeNote && editorRef.current) {
      editorRef.current.focus();
    }
  }, [activeNote]);
  return (
    <>
      {activeNote ? (
        <>
          <span className="text-sm text-zinc-400">
            {new Date(activeNote.dateCreated).toLocaleString()}
          </span>
          <div
            ref={editorRef}
            contentEditable
            onInput={debouncedHandleInput}
            className="w-full flex-1 self-start p-5 text-xl leading-relaxed text-white outline-none"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
            suppressContentEditableWarning={true}
          >
            {activeNote.text}
          </div>
        </>
      ) : (
        <>
          <span className="text-gray-500">
            Select a note or create a new one
          </span>
          <Button
            className="cursor-pointer bg-yellow-500 font-normal text-black hover:bg-yellow-600"
            onClick={addNote}
          >
            Create new note
          </Button>
        </>
      )}
    </>
  );
};
