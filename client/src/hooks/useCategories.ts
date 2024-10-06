import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from "@/services/api-services";
import { Category } from '@/types/categories';

// Fetching categories from the API
const fetchCategories = async (): Promise<Category[]> => {
    const response = await ApiService.getCategories();
    if (response.data && Array.isArray(response.data)) {
        return response.data;
    } else {
        throw new Error('Unexpected data structure');
    }
};

// Custom hook for categories
export const useCategories = () => {
    const queryClient = useQueryClient(); // Get the query client

    // Using useQuery to fetch data
    const query = useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
    });

    return {
        ...query,
        invalidateCategories: () => queryClient.invalidateQueries({queryKey:['categories']}),
        setCategories: (data: Category[]) => queryClient.setQueryData(['categories'], data),
    };
};
