import { create } from "zustand";

type ShareModel = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useShareModalStore = create<ShareModel>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));