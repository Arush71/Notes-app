import clsx from "clsx";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatDate } from "~/data/test";
import type { NProps } from "./Notes";

export const NotesSidebar = ({
  activeNote,
  setActiveNote,
  notes,
  addNote,
}: NProps) => {
  const getNoteTitle = (text: string) => {
    const lines = text
      .split(/\r?\n/) // split into lines
      .map((line) => line.trim()) // trim each line
      .filter((line) => line.length > 0); // keep only non-empty lines
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return lines[0] || "New Note";
  };

  const getNoteDescription = (text: string) => {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return lines[1] || "No additional text";
  };
  return (
    <>
      <div className="flex flex-col gap-4 border-b-[1.25px] border-gray-800 px-6 py-5">
        <span className="text-xl font-semibold text-yellow-400">Notes</span>
        <Input placeholder="Search notes" />
      </div>
      <div className="flex h-12 items-center justify-between border-b-[1.25px] border-gray-800 px-4">
        <span className="text-sm text-gray-400">{notes.length} Notes</span>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="cursor-pointer rounded-full"
          onClick={addNote}
        >
          <Plus className="size-5 text-yellow-400" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul>
          {[...notes].map((note) => (
            <li
              key={note.id}
              className={clsx(
                "flex cursor-pointer flex-col gap-1 border-b-[1.25px] border-b-gray-800 px-4 py-3 hover:bg-zinc-900",
                {
                  "!bg-accent !hover:bg-accent": note.id === activeNote?.id,
                },
              )}
              onClick={() => setActiveNote(note)}
            >
              <h3 className="truncate font-medium text-white">
                {getNoteTitle(note.text)}
              </h3>
              <div className="flex text-xs text-gray-400">
                <span>{formatDate(note.dateCreated)}</span>
                <span className="mx-1">•</span>
                <span className="truncate">
                  {getNoteDescription(note.text)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
