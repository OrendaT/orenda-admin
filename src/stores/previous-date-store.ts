import { create } from 'zustand';

interface PreviousDateState {
  days: string;
  setDays: (days: string) => void;
}

export const usePreviousDateStore = create<PreviousDateState>((set) => ({
  days: '7',
  setDays: (days: string) => set({ days }),
}));
