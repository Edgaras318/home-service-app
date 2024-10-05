import axios, { InternalAxiosRequestConfig } from "axios";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    timeout: 10000, // Set your timeout as needed
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // If token exists, add it to the Authorization header
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
