import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from "@/services/api-services";
import { Category } from '@/types/categories';
import { Business } from '@/types/businesses';
import { QueryKeys } from '@/consts/queryKeys';
import {types} from "sass";
import Error = types.Error; // Import the query keys

// Fetching categories from the API
const fetchCategories = async (): Promise<Category[]> => {
    const response = await ApiService.getCategories();

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

// Custom hook for categories
export const useCategories = () => {
    const queryClient = useQueryClient(); // Get the query client

    // Using useQuery to fetch data
    const query = useQuery<Category[], Error>({
        queryKey: QueryKeys.CATEGORIES, // Use the constant
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
    });

    return {
        ...query,
        invalidateCategories: () => queryClient.invalidateQueries({ queryKey: QueryKeys.CATEGORIES }), // Use the constant
        setCategories: (data: Category[]) => queryClient.setQueryData(QueryKeys.CATEGORIES, data), // Use the constant
    };
};
