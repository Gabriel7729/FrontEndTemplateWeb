import { create } from "zustand";

export type AuthUser = {
  token: string | null;
};

export type AuthUserActions = {
    getToken: () => string | null;
};
export const useAuthStore = create<AuthUser & AuthUserActions>((set, get) => ({
    token: null,
    getToken: () => get().token,
    setToken: (token: string) => set({ token }),
}));
