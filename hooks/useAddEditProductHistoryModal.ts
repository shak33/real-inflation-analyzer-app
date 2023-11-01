import { create } from "zustand";

interface EditProductHistoryModalState {
  editedId: string;
  isOpen: boolean;
  setEditedRow: (id: string) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useAddEditProductHistoryModal = create<EditProductHistoryModalState>((set) => ({
  editedId: "",
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, editedId: "" }),
  setEditedRow: (id) => set({ editedId: id }),
}));