import { notes } from "~/data/test";

export const createNote = () => {
  notes.push({
    text: "",
    title: "",
    dateCreated: new Date(),
    id: crypto.randomUUID(),
  });
};
