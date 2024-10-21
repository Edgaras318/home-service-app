import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCategories } from '@/services/api-services/categories-api'; // Import the function from the new file
import { Category } from '@/types/categories';
import { QueryKeys } from '@/consts/queryKeys'; // Import the query keys

// Custom hook for categories
export const useCategories = () => {
    const queryClient = useQueryClient(); // Get the query client

    // Using useQuery to fetch categories data
    const query = useQuery<Category[], Error>({
        queryKey: QueryKeys.CATEGORIES, // Use the constant
        queryFn: fetchCategories, // Use the fetchCategories function to handle API call and validation
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        gcTime: 1000 * 60 * 10, // Keep inactive queries in cache for 10 minutes
        retry: 1, // Retry once on failure
    });

    return {
        ...query,
        invalidateCategories: () => queryClient.invalidateQueries({ queryKey: QueryKeys.CATEGORIES }), // Use the constant
        setCategories: (data: Category[]) => queryClient.setQueryData(QueryKeys.CATEGORIES, data), // Use the constant
    };
};
