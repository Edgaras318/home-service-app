import { ApiService } from "@/services/api-services";
import { Business } from '@/types/businesses';

export const fetchBusinesses = async (): Promise<Business[]> => {
    const response = await ApiService.getBusinesses(); // Use the centralized API call

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
