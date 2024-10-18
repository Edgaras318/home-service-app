// // src/config/react-query-config.ts
// import { QueryClient } from '@tanstack/react-query';
// import { useUserStore } from '@/stores/userStore'; // Ensure this path is correct
// import { AxiosError } from 'axios';
//
// // Global error handler for React Query
// const handleAuthError = (error: unknown) => {
//     // Use type assertion to check if error is an AxiosError
//     const axiosError = error as AxiosError;
//
//     // Access Zustand's clearUser function
//     const clearUser = useUserStore.getState().clearUser;
//
//     if (axiosError?.response?.status === 401 || axiosError?.response?.status === 403) {
//         clearUser(); // Clear the user/token from Zustand store
//         window.location.href = '/login'; // Change to your login route
//     }
// };
//
// // Create a React Query Client with global error handling
// export const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             retry: false, // Optional: prevent retries on failures
//             onError: (error: unknown) => handleAuthError(error), // Attach global error handler for queries
//         },
//         mutations: {
//             onError: (error: unknown) => handleAuthError(error), // Attach global error handler for mutations
//         },
//     },
// });
