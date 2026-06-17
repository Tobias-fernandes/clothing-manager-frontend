import { AuthState } from "@/@types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isManager: () => get().user?.role === "manager",
    }),
    {
      name: "clothing-auth",
      skipHydration: true,
    },
  ),
);

export { useAuthStore };
