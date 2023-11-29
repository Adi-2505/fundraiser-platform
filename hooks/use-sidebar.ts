import { create } from "zustand";

type SidebarState = {
  open: boolean;
  onOpen: () => void;
  // onClose: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  onOpen: () => set((state) => ({ open: !state.open }))
  // onClose: () => set({ open: false }),
}));