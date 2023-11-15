import { create } from "zustand";

type DonateModel = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDonateModalStore = create<DonateModel>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
