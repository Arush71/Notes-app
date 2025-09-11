import { useMutation } from "@tanstack/react-query";
import { editNoteFn } from "~/app/notes/action";
import { getQueryClient } from "~/providers/get-query-client";
import type { Note } from "~/types/notes.types";

export const useEditNote = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: async ({
      noteId,
      text,
      userId,
    }: {
      noteId: string;
      text: string;
      userId: string;
    }) => await editNoteFn(userId, text, noteId),
    onMutate: async ({ noteId, text }) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      const prevNote = queryClient.getQueryData<Note[]>(["notes"]) ?? [];
      queryClient.setQueryData<Note[]>(["notes"], (old = []) => {
        return old.map((n) =>
          n.id === noteId ? { ...n, text, updatedAt: new Date() } : n,
        );
      });
      return { prevNote };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevNote) {
        queryClient.setQueryData(["notes"], context.prevNote);
      }
    },
  });
};
