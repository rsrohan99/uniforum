import { create } from 'zustand';

interface TriggerPostRefreshHook {
  triggerPostRefresh: boolean,
  toggleTriggerPostRefresh: () => void,
}


export const useTriggerPostRefresh = create<TriggerPostRefreshHook>((set, getState) => ({
  triggerPostRefresh: false,
  toggleTriggerPostRefresh: () => set((state) => ({triggerPostRefresh: !state.triggerPostRefresh})),
}));
