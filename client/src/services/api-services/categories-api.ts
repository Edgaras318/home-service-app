import { ApiService } from "@/services/api-services";
import { Category } from '@/types/categories';

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await ApiService.getCategories(); // Use the centralized API call

    // Check for success status in the response data
    if (response.data.success) {
        if (response.data.data && Array.isArray(response.data.data)) {
            return response.data.data; // Return the actual category data
        } else {
            throw new Error('Unexpected data structure');
        }
    } else {
        // If success is false, throw an error with the provided message
        throw new Error(response.data.message || 'An unknown error occurred');
    }
};
