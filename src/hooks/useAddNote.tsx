import { useMutation } from "@tanstack/react-query";
import { addNoteA } from "~/app/notes/action";
import { getQueryClient } from "~/providers/get-query-client";
import type { Note } from "~/types/notes.types";

export const useAddNote = (
  userId: string,
  onActiveNoteChange: (noteId: string | null) => void,
) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: async () => await addNoteA(userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      const prevNote = queryClient.getQueryData<Note[]>(["notes"]) ?? [];
      const optimisticNote: Note = {
        id: "temp-" + Date.now(),
        text: "",
        updatedAt: new Date(),
      };
      queryClient.setQueryData<Note[]>(
        ["notes"],
        [...prevNote, optimisticNote],
      );
      onActiveNoteChange(optimisticNote.id);
      return { prevNote, optimisticId: optimisticNote.id };
    },
    onError: (_err, _newNote, context) => {
      if (context?.prevNote) {
        queryClient.setQueryData(["notes"], context.prevNote);
      }
      if (context?.optimisticId) {
        onActiveNoteChange(null);
      }
    },
    onSuccess: (newNote) => {
      queryClient.setQueryData<Note[]>(["notes"], (old = []) => {
        return [...old.filter((n) => !n.id.startsWith("temp-")), ...newNote];
      });

      onActiveNoteChange(newNote[0]?.id ?? null);
    },
  });
};
