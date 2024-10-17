import React from 'react';
import styles from './BookingCardList.module.scss';
import { BookingCard as BookingCardType } from "@/types/bookings";
import BookingCard from "@/components/BookingCard/BookingCard";

interface BookingCardListProps {
    bookings: BookingCardType[];
}

const BookingCardList: React.FC<BookingCardListProps> = ({ bookings }) => {
    return (
        <div className={styles.bookingCardList}>
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <BookingCard
                        key={booking._id}
                        {...booking}
                    />
                ))
            ) : (
                <div className={styles.noBookings}>No bookings found.</div>
            )}
        </div>
    );
};

export default BookingCardList;
