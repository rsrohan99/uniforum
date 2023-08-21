import { create } from 'zustand';

interface BookmarksHook {
  isBookmarks: boolean,
  getLatestBookmarks: () => boolean,
  setBookmarks: (loading: boolean) => void,
}


export const useBookmarks = create<BookmarksHook>((set, getState) => ({
  isBookmarks: false,
  getLatestBookmarks: () => getState().isBookmarks,
  setBookmarks: (loading: boolean) => set({isBookmarks: loading}),
}));
