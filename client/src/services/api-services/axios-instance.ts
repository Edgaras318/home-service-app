import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { PROD } from "@/consts/environment";
import { useUserStore } from '@/stores/userStore'; // Adjust the path as necessary
import { AxiosError } from 'axios';

const baseURL = PROD ? process.env.VITE_SERVER_URL : "http://localhost:5001/api/";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000, // Set your timeout as needed
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // Retrieve the 'user-storage' item from localStorage
        const storedData = localStorage.getItem('user-storage');

        // If the data exists, parse it and extract the token
        if (storedData) {
            const parsedData = JSON.parse(storedData);

            // Check if parsedData has a 'token' and if so, set the Authorization header
            const token = parsedData?.state?.token; // Assuming token is under 'state.token'

            if (token) {
                // Create a new AxiosHeaders object and set the Authorization header
                const headers = new AxiosHeaders(config.headers);
                headers.set('Authorization', `Bearer ${token}`);

                config.headers = headers;
            }
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error: AxiosError) => {
        const clearUser = useUserStore.getState().clearUser;

        // Check if the error is an AxiosError and if the status is 401 or 403
        if (error.isAxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
            clearUser(); // Clear user state in Zustand
            // window.location.href = '/login'; // Redirect to login page
        }

        return Promise.reject(error); // Reject other errors
    }
);

export default axiosInstance;
