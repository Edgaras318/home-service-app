import {useQuery, useQueryClient} from "@tanstack/react-query";
import {QueryKeys} from "@/consts/queryKeys";
import { BookingCard} from '@/types/bookings'
import {fetchUserBookings} from "@/services/api-services/bookings-api";
import {fetchBusinesses} from "@/services/api-services/businesses-api";

export const useBookings = (email: string) => {

    const query = useQuery<BookingCard[], Error>({
        queryKey: QueryKeys.BOOKINGS, // Use the constant
        queryFn: () => fetchUserBookings(email), // Call the API function with the email
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        enabled: !!email
    });

    return {
        ...query,
    };
};
