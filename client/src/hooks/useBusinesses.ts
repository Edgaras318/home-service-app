import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from "@/services/api-services";
import { Business } from '@/types/businesses';
import { QueryKeys } from '@/consts/queryKeys'; // Import the query keys

const fetchBusinesses = async (): Promise<Business[]> => {
    const response = await ApiService.getBusinesses();

    // Check for success status in the response data
    if (response.data.success) {
        if (response.data.data && Array.isArray(response.data.data)) {
            return response.data.data; // Return the actual business data
        } else {
            throw new Error('Unexpected data structure');
        }
    } else {
        // If success is false, throw an error with the provided message
        throw new Error(response.data.message || 'An unknown error occurred');
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
