import { create } from 'zustand'


interface StoreState {
  isLight: boolean;
  changeTheme: () => void;
}

const useApplicationStore = create<StoreState>((set) => ({
  isLight: localStorage.getItem('theme') !== 'dark',

  changeTheme: () => set((state) => ({ isLight: !state.isLight })),

}));

export default useApplicationStore;