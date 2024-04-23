import { create } from "zustand";

const INITIAL_STATE = {
  bear: "🐻",
  updateBear: (bear: string) => {},
};

interface BearStateActions {
  bear: string | null;
  updateBear: (bear: string) => void;
}

export const useBear = create<BearStateActions>((set) => ({
  ...INITIAL_STATE,
  updateBear: (bear) => set({ bear }),
}));
