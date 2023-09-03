import { create } from 'zustand';

interface TriggerNotificationsRefreshHook {
  triggerNotificationsRefresh: boolean,
  toggleTriggerNotificationsRefresh: () => void,
}


export const useTriggerNotificationsRefresh = create<TriggerNotificationsRefreshHook>((set, getState) => ({
  triggerNotificationsRefresh: false,
  toggleTriggerNotificationsRefresh: () => set((state) => ({triggerNotificationsRefresh: !state.triggerNotificationsRefresh})),
}));
