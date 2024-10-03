// userStore.ts
import { create } from "zustand";
import { persist } from 'zustand/middleware';

// Define the shape of the user state
type User = {
    username: string; // Add more fields as necessary
    // Add additional fields that the user object may have
}

// Define the state shape for the store
type UserStore = {
    user: User | null; // User can be null or an object of type User
    setUser: (userData: User) => void; // Function to set user data
    clearUser: () => void; // Function to clear user data
}

// Create a Zustand store with persistence
export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null, // Initial user state
            setUser: (userData) => set({ user: userData }), // Update user state
            clearUser: () => set({ user: null }), // Clear user state
        }),
        {
            name: "user-storage", // Key for localStorage
            getStorage: () => localStorage, // Use localStorage as the storage
        }
    )
);
