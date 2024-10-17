// BookingCardList.tsx
import React from 'react';
import styles from './BookingCardList.module.scss';
import {BookingCard as BookingCardType} from "@/types/bookings";
import BookingCard from "@/components/BookingCard/BookingCard";

interface BookingCardListProps {
    bookings: BookingCardType[];
}

const BookingCardList: React.FC<BookingCardListProps> = ({ bookings }) => {
    return (
        <div className={styles.bookingCardList}>
            {bookings.map((booking) => (
                <BookingCard
                    key={booking._id}
                    {...booking}
                />
            ))}
        </div>
    );
};

export default BookingCardList;
