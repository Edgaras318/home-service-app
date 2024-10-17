import { Business } from "@/types/businesses";

export type BookingCard = {
    _id?: string
    businessId: Business;
    date: Date;
    time: string;
    userName: string;
    status: string;
}

export interface Booking {
    _id?: string;
    businessId: string;
    date: Date;
    time: string;
    userEmail: string;
    userName: string;
    status: string;
}
