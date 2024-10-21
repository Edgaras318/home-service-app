import { useMutation } from '@tanstack/react-query';
import { ApiService } from '@/services/api-services';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { FormDataRegister, LoginPayload } from '@/types';
import {QueryKeys} from "@/consts/queryKeys";

interface UseAuthOptions {
    mode: 'register' | 'login';
}

export const useAuth = ({ mode }: UseAuthOptions) => {
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (values: LoginPayload | FormDataRegister) => {
            if (mode === 'register') {
                const { name, age, email, password } = values as FormDataRegister;
                return ApiService.register(name, age, email, password);
            } else {
                const { email, password } = values as LoginPayload;
                return ApiService.login(email, password);
            }
        },
        mutationKey: [QueryKeys.USERS],

        onSuccess: (data) => {
            setUser(data?.data);
            navigate('/');
        },
        onError: (error) => {
            // Handle error if necessary (logging, notifications, etc.)
            console.error("Authentication error: ", error);
        },
    });
};
