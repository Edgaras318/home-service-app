import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
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

export default axiosInstance;
