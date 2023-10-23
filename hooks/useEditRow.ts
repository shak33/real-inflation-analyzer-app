import { create } from "zustand";

interface EditRowState {
  editId: string;
  setEditRow: (id: string) => void;
}

export const useEditRow = create<EditRowState>((set) => ({
  editId: "",
  setEditRow: (id) => set({
    editId: id,
  }),
}));