import { create } from 'zustand';

export type SortOrder = "new" | "top"

interface SortOrderHook {
  sortOrder: SortOrder,
  getLatestSortOrder: () => SortOrder,
  setSortOrder: (order: SortOrder) => void,
}


export const usePostSorting = create<SortOrderHook>((set, getState) => ({
  sortOrder: "new",
  getLatestSortOrder: () => getState().sortOrder,
  setSortOrder: (order: SortOrder) => set({sortOrder: order}),
}));
