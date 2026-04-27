import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(persist((set) => ({
    user: null,
    _hasHydrated: false,

    logout: () => set({ user: null }),
    setUser: (user) => set({ user }),
    setHasHydrated: (v) => set({ _hasHydrated: v }),
}), {
    name: "user",
    onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true)
    },
}));