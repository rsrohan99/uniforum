import { create } from 'zustand';

interface PostsLoadingHook {
  postsLoading: boolean,
  getLatestPostsLoading: () => boolean,
  setPostsLoading: (loading: boolean) => void,
}


export const usePostsLoading = create<PostsLoadingHook>((set, getState) => ({
  postsLoading: true,
  getLatestPostsLoading: () => getState().postsLoading,
  setPostsLoading: (loading: boolean) => set({postsLoading: loading}),
}));
