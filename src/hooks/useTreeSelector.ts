import { create } from 'zustand';

interface TreeSelectorHook {
  selected: string,
  getLatestSelected: () => string,
  setSelected: (newQuery: string) => void,
}


export const useTreeSelectorHook = create<TreeSelectorHook>((set, getState) => ({
  selected: "",
  getLatestSelected: () => getState().selected,
  setSelected: (newQuery: string) => set({selected: newQuery}),
}));
