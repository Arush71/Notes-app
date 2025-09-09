import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button } from "~/components/ui/button";
import debounce from "lodash.debounce";
import { useSignout } from "~/hooks/use-signout";
import type { Note } from "~/types/notes.types";
import type { UseMutationResult } from "@tanstack/react-query";

interface NoteEditProps {
  activeNote: Note | null; // now derived by parent
  addNote: UseMutationResult<
    Note[],
    Error,
    void,
    {
      prevNote: Note[];
    }
  >;
  // setNotes: (updater: (prev: noteType[]) => noteType[]) => void;

  setLivePreview: Dispatch<
    SetStateAction<{
      id: string;
      text: string;
    } | null>
  >;
}

export const NoteEdit = ({
  activeNote,
  addNote,
  // setNotes,
  setLivePreview,
}: NoteEditProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const handleInput = useCallback(() => {
    if (!editorRef.current || !activeNote) return;

    // setNotes((prev) =>
    //   prev.map((note) =>
    //     note.id === activeNote.id
    //       ? { ...note, text: editorRef.current?.innerText ?? "" }
    //       : note,
    //   ),
    // );
  }, [activeNote]);
  const debouncedHandleInput = useMemo(
    () => debounce(handleInput, 3000),
    [handleInput],
  );
  function placeCaretAtEnd(el: HTMLElement) {
    if (!el) return;
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false); // collapse to end
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
  useEffect(() => {
    if (!editorRef.current) return;
    const editorEl = editorRef.current;
    editorRef.current.innerText = activeNote?.text ?? "";

    editorRef.current.focus();
    placeCaretAtEnd(editorRef.current);

    return () => {
      debouncedHandleInput.flush();
      if (activeNote?.id && editorEl) {
        if (editorEl.innerText.trim() !== activeNote.text.trim()) {
          const textToSave = editorEl.innerText ?? "";
          // setNotes((prev) =>
          //   prev.map((note) =>
          //     note.id === activeNote.id ? { ...note, text: textToSave } : note,
          //   ),
          // );
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNote]);
  useEffect(() => {
    return () => {
      debouncedHandleInput.cancel();
    };
  }, [debouncedHandleInput]);
  const handleLivePreview = useCallback(() => {
    if (!editorRef.current || !activeNote) return;

    const text = editorRef.current.innerText ?? "";
    setLivePreview({ id: activeNote.id, text });
    debouncedHandleInput();
  }, [activeNote, debouncedHandleInput, setLivePreview]);
  const handleSignOut = useSignout();
  return (
    <>
      {activeNote ? (
        <>
          <span className="text-sm text-zinc-400">
            {new Date(activeNote.updatedAt).toLocaleString()}
          </span>
          <div
            ref={editorRef}
            contentEditable
            onInput={handleLivePreview}
            className="w-full flex-1 self-start p-5 text-xl leading-relaxed text-white outline-none"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
            suppressContentEditableWarning={true}
            // onBlur={handleInput} Causes focus problems
          />
        </>
      ) : (
        <>
          <span className="text-gray-500">
            Select a note or create a new one
          </span>
          <Button
            className="cursor-pointer bg-yellow-500 font-normal text-black hover:bg-yellow-600"
            onClick={() => addNote.mutate()}
            disabled={addNote.isPending}
          >
            Create new note
          </Button>
          <Button
            variant={"destructive"}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </>
      )}
    </>
  );
};
