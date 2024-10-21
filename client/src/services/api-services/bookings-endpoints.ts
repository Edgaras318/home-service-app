import axiosInstance from "@/services/api-services/axios-instance";
import {Booking} from "@/types/bookings";

export const createBooking = async (bookingData: Booking) => {
   return axiosInstance.post("/bookings", bookingData);
}

export const getUserBookings = async (email: string) => {
   return axiosInstance.get(`/bookings/user/${email}`);
};
