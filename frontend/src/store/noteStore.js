import { create } from "zustand";

export const useNoteStore = create((set) => ({
  mutate: null,
  setMutate: (payload) => set(() => ({ mutate: payload })),
  notes: null,
  setNotes: (payload) => set(() => ({ notes: payload })),
  addNote: (payload) => set((state) => ({ notes: [payload, ...state.notes] })),
  updateNote: (payload) =>
    set((state) => ({
      notes: state.notes.map((n) => (n._id !== payload._id ? n : payload)),
    })),
  deleteNote: (payload) =>
    set((state) => ({
      notes: state.notes.filter((n) => n._id !== payload._id),
    })),
}));
