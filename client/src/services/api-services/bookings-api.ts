import { ApiService } from "@/services/api-services";
import {Booking, BookingCard} from "@/types/bookings";

export const createBooking = async (bookingData: Booking): Promise<Booking[]> => {
    const response = await ApiService.createBooking(bookingData); // Use the centralized API call

    // Check for success status in the response data
    if (response.data.success && response.data.data) {
        return response.data.data; // Return the actual data
    } else {
        throw new Error('Unexpected data structure');
    }
};
export const fetchUserBookings = async (email: string): Promise<BookingCard[]> => {
    const response = await ApiService.getUserBookings(email); // Use the centralized API call

    // Check for success status in the response data
    if (response.data.success && response.data.data) {
        return response.data.data; // Return the actual data
    } else {
        throw new Error('Unexpected data structure');
    }
};
