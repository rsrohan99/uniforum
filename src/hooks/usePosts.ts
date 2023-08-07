import { create } from 'zustand';

interface PostsHook {
  post_ids: string[],
  getLatestPostIds: () => string[],
  setPostIds: (posts: string[]) => void,
}


export const usePostsHook = create<PostsHook>((set, getState) => ({
  post_ids: [],
  getLatestPostIds: () => getState().post_ids,
  setPostIds: (posts: string[]) => set({post_ids: posts}),
}));
