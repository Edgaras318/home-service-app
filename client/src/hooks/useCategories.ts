import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from "@/services/api-services";
import { Category } from '@/types/categories';

const fetchCategories = async (): Promise<Category[]> => {
    const response = await ApiService.getCategories();
    if (response.data && Array.isArray(response.data)) {
        return response.data;
    } else {
        throw new Error('Unexpected data structure');
    }
};

export const useCategories = () => {
    const queryClient = useQueryClient(); // Get the query client

    return {
        ...useQuery<Category[], Error>({
            queryKey: ['categories'],
            queryFn: fetchCategories,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
            retry: 1,
        }),
        invalidateCategories: () => queryClient.invalidateQueries(['categories']),
        setCategories: (data: Category[]) => queryClient.setQueryData(['categories'], data),
    };
};
