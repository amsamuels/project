import { create } from 'zustand';

export type BackendUser = {
  name: string;
  email: string;
  sub: string;
  picture?: string;
  // Add more as needed
};

type UserStore = {
  user: BackendUser | null;
  setUser: (user: BackendUser) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
