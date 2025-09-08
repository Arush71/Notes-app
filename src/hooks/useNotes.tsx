import { useQuery } from "@tanstack/react-query";
import type { Note } from "~/types/notes.types";

export function useNotes() {
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      throw new Error("Query function should not run (SSR hydrated only)");
    },
    enabled: false,
  });
}
