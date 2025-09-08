export interface Note {
  id: string;
  text: string;
  updatedAt: Date;
}

export type NotesReturnT<T> = {
  success: boolean;
  return: T;
};
