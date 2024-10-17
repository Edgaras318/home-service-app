import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createBooking} from "@/services/api-services/bookings-api";
import {QueryKeys} from "@/consts/queryKeys";

export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            // Invalidate the businesses query to refetch businesses after booking is created
            queryClient.invalidateQueries({queryKey: [QueryKeys.BOOKINGS]});
        },
    });
};
