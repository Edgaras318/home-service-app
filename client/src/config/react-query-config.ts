// src/config/react-query-config.ts
import { QueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/stores/userStore';  // Adjust the path as necessary

// Global error handler for React Query
const handleAuthError = (error: any) => {
    const clearUser = useUserStore.getState().clearUser; // Access Zustand's clearUser function
    window.location.href = '/login'; // Change to your login route

    if (error?.response?.status === 401 || error?.response?.status === 403) {
        // If error status is 401 (unauthorized) or 403 (forbidden), log the user out
        clearUser(); // Clear the user/token from Zustand store
    }
};

// Create a React Query Client with global error handling
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Optional: prevent retries on failures
            onError: (error) => handleAuthError(error), // Attach global error handler for queries
        },
        mutations: {
            onError: (error) => handleAuthError(error), // Attach global error handler for mutations
        },
    },
});
