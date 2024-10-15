import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBusinesses } from '@/services/api-services/businesses-api'; // Import the function from the new file
import { Business } from '@/types/businesses';
import { QueryKeys } from '@/consts/queryKeys'; // Import the query keys

// Custom hook for businesses
export const useBusinesses = () => {
    const queryClient = useQueryClient(); // Get the query client

    const query = useQuery<Business[], Error>({
        queryKey: QueryKeys.BUSINESSES, // Use the constant
        queryFn: fetchBusinesses, // Use the fetchBusinesses function to handle API call and validation
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
