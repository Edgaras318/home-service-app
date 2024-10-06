import axiosInstance from "./axios-instance";
import {AuthResponse, LoginPayload, RegisterPayload} from "@/types";

const entityPath = 'auth';

// Function to handle login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const payload: LoginPayload = { email, password };
    const response = await axiosInstance.post<AuthResponse>(`/${entityPath}/login`, payload);
    return response.data;  // Return the data part of the response
};

// Function to handle registration
export const register = async (name: string, age: number, email: string, password: string): Promise<AuthResponse> => {
    // const payload: RegisterPayload = { name, age, email, password };
    const payload: RegisterPayload = { email, password };
    const response = await axiosInstance.post<AuthResponse>(`/${entityPath}/register`, payload);
    return response.data;  // Return the data part of the response
};
