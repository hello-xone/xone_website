import { create } from "zustand";

interface StoreState {
  isLight: boolean;
  changeTheme: (flag: boolean) => void;
}

const useApplicationStore = create<StoreState>((set) => ({
  isLight: localStorage.getItem("theme") !== "dark",
  changeTheme: (flag: boolean) => set(() => ({ isLight: flag })),
}));
export default useApplicationStore;
