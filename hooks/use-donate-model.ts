import {create} from 'zustand';


type DonateModel = {
  open: boolean;
  toggle: () => void;
}

export const useDonateModel = create<DonateModel>(set => ({
  open: false,
  toggle: () => set(state => ({open: !state.open}))
}));