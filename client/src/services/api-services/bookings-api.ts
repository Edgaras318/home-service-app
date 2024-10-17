import { ApiService } from "@/services/api-services";
import {Business} from "@/types";
import {Booking} from "@/types/bookings";

export const createBooking = async (bookingData: Booking): Promise<Business[]> => {
    const response = await ApiService.createBooking(bookingData); // Use the centralized API call

    // Check for success status in the response data
    if (response.data.success && response.data.data) {
        return response.data.data; // Return the actual data
    } else {
        throw new Error('Unexpected data structure');
    }
};
