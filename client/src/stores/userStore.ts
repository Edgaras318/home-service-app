import { create } from "zustand";
import { persist, PersistStorage } from 'zustand/middleware';
import { AuthData, User } from "@/types";

// Define the state shape for the store
type UserStore = {
    user: User | null; // User can be null or an object of type User
    token: string | null; // Token can be null or a string
    setUser: (userData: AuthData) => void; // Function to set user data
    clearUser: () => void; // Function to clear user data
};

// Create a custom storage object to satisfy the PersistStorage interface
const customStorage: PersistStorage<UserStore> = {
    getItem: (name) => {
        const item = localStorage.getItem(name);
        return item ? JSON.parse(item) : null; // Parse the string to return the stored object
    },
    setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value)); // Stringify the value before storing
    },
    removeItem: (name) => {
        localStorage.removeItem(name); // Remove item from localStorage
    },
};

// Create a Zustand store with persistence
export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null, // Initial user state
            token: null, // Initial token state
            setUser: (userData) => {
                set({ user: userData.user, token: userData.token }); // Update user and token state
                // The token will also be handled by the custom storage
            },
            clearUser: () => {
                set({ user: null, token: null }); // Clear user and token state
            },
        }),
        {
            name: "user-storage", // Key for localStorage
            storage: customStorage, // Use the custom storage as the storage
        }
    )
);
