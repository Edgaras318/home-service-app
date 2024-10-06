import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from "@/services/api-services";
import { Business } from '@/types/businesses';
import { QueryKeys } from '@/consts/queryKeys'; // Import the query keys

const fetchBusinesses = async (): Promise<Business[]> => {
    const response = await ApiService.getBusinesses();
    if (response.data && Array.isArray(response.data)) {
        return response.data;
    } else {
        throw new Error('Unexpected data structure');
    }
};

// Custom hook for businesses
export const useBusinesses = () => {
    const queryClient = useQueryClient(); // Get the query client

    const query = useQuery<Business[], Error>({
        queryKey: QueryKeys.BUSINESSES, // Use the constant
        queryFn: fetchBusinesses,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
    });

    return {
        ...query,
        invalidateBusinesses: () => queryClient.invalidateQueries({ queryKey: QueryKeys.BUSINESSES }), // Use the constant
        setBusinesses: (data: Business[]) => queryClient.setQueryData(QueryKeys.BUSINESSES, data), // Use the constant
    };
};
