import { create } from "zustand";
import { persist } from 'zustand/middleware'

// Create a Zustand store with persistence
export const useUserStore = create(
    persist(
        (set) => ({
            user: null, // Initial user state
            setUser: (userData) => set({ user: userData }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: "user-storage", // Key for localStorage
            getStorage: () => localStorage, // Use localStorage as the storage
        }
    )
);
