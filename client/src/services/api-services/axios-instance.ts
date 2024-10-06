import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";

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
            // Create a new AxiosHeaders object and set the Authorization header
            const headers = new AxiosHeaders(config.headers);
            headers.set('Authorization', `Bearer ${token}`);

            config.headers = headers;
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
