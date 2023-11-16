import { create } from "zustand";

type LoginModel = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useLoginModalStore = create<LoginModel>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));