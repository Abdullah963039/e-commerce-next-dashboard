import { create } from "zustand";

type useModalStoreType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useModalStore = create<useModalStoreType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
