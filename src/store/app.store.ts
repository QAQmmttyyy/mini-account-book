import create from "zustand";

interface AppState {
  msg: string | null;
  setMsg: (msg: string | null) => void;
}

export const useAppStore = create<AppState>((set) => {
  return {
    msg: null,
    setMsg: (msg) => {
      set({ msg });
    },
  };
});
