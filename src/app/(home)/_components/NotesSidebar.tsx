import clsx from "clsx";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatDate } from "~/data/test";
import type { NProps } from "./Notes";
import { useMemo, useState } from "react";

export const NotesSidebar = ({
  activeNote,
  setActiveNote,
  notes,
  addNote,
}: NProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredList = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return notes.filter((note) => note.text.toLowerCase().includes(term));
  }, [searchTerm, notes]);
  const parseNote = (text: string) => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    return {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      title: lines[0] || "New Note",
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      description: lines[1] || "No additional text",
    };
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-b-[1.25px] border-gray-800 px-6 py-5">
        <span className="text-xl font-semibold text-yellow-400">Notes</span>
        <Input
          placeholder="Search notes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex h-12 items-center justify-between border-b-[1.25px] border-gray-800 px-4">
        <span className="text-sm text-gray-400">
          {filteredList.length} Notes
        </span>
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
        {notes.length ? (
          <ul>
            {filteredList.map((note) => {
              const { title, description } = parseNote(note.text);
              return (
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
                  <h3 className="truncate font-medium text-white">{title}</h3>
                  <div className="flex text-xs text-gray-400">
                    <span>{formatDate(note.dateCreated)}</span>
                    <span className="mx-1">•</span>
                    <span className="truncate">{description}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400/95">
            Nothing to show
          </div>
        )}
      </div>
    </>
  );
};
