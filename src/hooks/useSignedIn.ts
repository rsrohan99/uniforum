import { create } from 'zustand';

interface SignedInHook {
  signedIn: boolean,
  getLatestSignedIn: () => boolean,
  setSignedIn: (loading: boolean) => void,
}


export const useSignedIn = create<SignedInHook>((set, getState) => ({
  signedIn: (typeof window !== 'undefined')? !!localStorage.getItem('signedIn'): false,
  getLatestSignedIn: () => getState().signedIn,
  setSignedIn: (loading: boolean) => set({signedIn: loading}),
}));
