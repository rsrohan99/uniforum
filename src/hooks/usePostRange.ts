import { create } from 'zustand';

export type RangeOptions = "all_time" | "today" | "this_week" | "this_month" | "this_year"

interface RangeOptionsHook {
  postRange: RangeOptions,
  getLatestRange: () => RangeOptions,
  setRange: (order: RangeOptions) => void,
}


export const usePostRange = create<RangeOptionsHook>((set, getState) => ({
  postRange: "all_time",
  getLatestRange: () => getState().postRange,
  setRange: (order: RangeOptions) => set({postRange: order}),
}));
