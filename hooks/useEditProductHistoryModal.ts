import { create } from "zustand";

interface EditProductHistoryModalState {
  editedId: string;
  isOpen: boolean;
  setEditedRow: (id: string) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useEditProductHistoryModal = create<EditProductHistoryModalState>((set) => ({
  editedId: "",
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setEditedRow: (id) => set({ editedId: id }),
}));