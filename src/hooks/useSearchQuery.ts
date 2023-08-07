import { create } from 'zustand';

interface SearchQueryHook {
  query: string,
  getLatestQuery: () => string,
  setQuery: (newQuery: string) => void,
}


export const useSearchQueryHook = create<SearchQueryHook>((set, getState) => ({
  query: "",
  getLatestQuery: () => getState().query,
  setQuery: (newQuery: string) => set({query: newQuery}),
}));
