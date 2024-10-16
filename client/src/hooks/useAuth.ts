// src/hooks/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from "@/services/api-services";
import { AuthResponse, ErrorResponseData, LoginPayload, FormDataRegister } from "@/types";
import { errorMessages } from '@/consts/errorMessages';
import { QueryKeys } from '@/consts/queryKeys';

export const useLogin = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<AuthResponse, ErrorResponseData, LoginPayload>({
        mutationFn: async (values) => {
            const response = await ApiService.login(values.email, values.password);
            return response.data;
        },
        onError: (error: ErrorResponseData) => {
            throw new Error(error?.message || errorMessages.authentication.defaultError);
        },
        onSuccess: (data) => {
            // Set user data in query cache
            queryClient.setQueryData(QueryKeys.USERS, data);
        },
    });

    return {
        ...mutation,
        // Optional: to invalidate user data after logout
        invalidateUser: () => queryClient.invalidateQueries({ queryKey: QueryKeys.USERS }),
    };
};

export const useRegister = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<AuthResponse, ErrorResponseData, FormDataRegister>({
        mutationFn: async (values) => {
            const response = await ApiService.register(values.name, values.age, values.email, values.password);
            return response.data;
        },
        onError: (error: ErrorResponseData) => {
            throw new Error(error?.message || errorMessages.authentication.defaultError);
        },
        onSuccess: (data) => {
            // Set user data in query cache
            queryClient.setQueryData(QueryKeys.USERS, data);
        },
    });

    return {
        ...mutation,
    };
};
