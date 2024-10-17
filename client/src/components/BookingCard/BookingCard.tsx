import React from 'react';
import styles from './BookingCard.module.scss';
import { BookingCard } from '@/types/bookings';
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import { LuCalendar } from "react-icons/lu";

const BookingCard: React.FC<BookingCard> = ({
                                                 businessId,
                                                 date,
                                                 time,
                                                 userName,
                                             }) => {

    return (
        <div className={styles.bookingCard}>
            {businessId?.photos.length && (
                <img
                    src={businessId.photos[0]}
                    alt={businessId?.name}
                    className={styles.bookingImage}
                />
            )}
            <div className={styles.bookingDetails}>
                <h3>{businessId?.name}</h3>
                <div className={styles.iconContainer}>
                    <FaRegUser className={styles.icon} />
                    <p className={styles.userName}>{userName}</p>
                </div>
                <div className={styles.iconContainer}>
                    <HiOutlineLocationMarker className={styles.icon} />
                    <p className={styles.address}>{businessId?.address}</p>
                </div>
                <div className={styles.iconContainer}>
                    <LuCalendar className={styles.icon} />
                    <p className={styles.serviceDate}>
                        <span>Service on:</span> <span
                        className={styles.date}>{new Date(date).toLocaleDateString()}</span>
                    </p>
                </div>
                <div className={styles.iconContainer}>
                    <HiOutlineClock className={styles.icon} />
                    <p className={styles.serviceTime}>
                        <span>Service on:</span> <span className={styles.time}>{time}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
