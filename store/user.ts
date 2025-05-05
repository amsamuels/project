import { create } from 'zustand';

export type BackendUser = {
  name: string;
  email: string;
  auth0_sub: string;
  role: 'free' | 'premium' | 'enterprise'; 
  created_at: string;
};

type UserStore = {
  backendUser: BackendUser | null;
  setBackendUser: (user: BackendUser) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  backendUser: null,
  setBackendUser: (user) => set({ backendUser: user }),
}));
