import { useMutation } from "@tanstack/react-query";
import { addNoteA } from "~/app/notes/action";
import { getQueryClient } from "~/providers/get-query-client";
import type { Note } from "~/types/notes.types";

export const useAddNote = (userId: string) => {
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
      return { prevNote };
    },
    onError: (_err, _newNote, context) => {
      if (context?.prevNote) {
        queryClient.setQueryData(["notes"], context.prevNote);
      }
    },
    onSuccess: (newNote) => {
      queryClient.setQueryData<Note[]>(["notes"], (old = []) => {
        return [...old.filter((n) => !n.id.startsWith("temp-")), ...newNote];
      });
    },
  });
};
