import { create } from 'zustand';

interface RegisterModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useRegisterModal = create<RegisterModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));