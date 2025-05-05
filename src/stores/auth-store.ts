// stores/auth-store.ts
import { create } from 'zustand';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

interface AuthStore {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  status: 'loading',
  setStatus: (status) => set({ status }),
}));
