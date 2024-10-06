import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from "@/services/api-services";
import { Business } from '@/types/businesses';

const fetchBusinesses = async (): Promise<Business[]> => {
    const response = await ApiService.getBusinesses();
    if (response.data && Array.isArray(response.data)) {
        return response.data;
    } else {
        throw new Error('Unexpected data structure');
    }
};

export const useBusinesses = () => {
    const queryClient = useQueryClient(); // Get the query client

    return {
        ...useQuery<Business[], Error>({
            queryKey: ['businesses'],
            queryFn: fetchBusinesses,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
            retry: 1,
        }),
        invalidateBusinesses: () => queryClient.invalidateQueries(['businesses']),
        setBusinesses: (data: Business[]) => queryClient.setQueryData(['businesses'], data),
    };
};
