import React from 'react';
import { useParams } from 'react-router-dom';
import TabPanel from "@/components/common/TabPanel/TabPanel";
import BookingCardList from "@/components/BookingCardList/BookingCardList";
import styles from './UserBookings.module.scss';
import { useBookings } from '@/hooks/useBookings'
interface UserBookingParams {
  email?: string;
  [key: string]: string | undefined;
}

const UserBookings: React.FC = () => {
  const { email } = useParams<UserBookingParams>();
  const { data: bookings, isLoading, error } = useBookings(email || ''); // Ensure email is defined

  if (isLoading) return <div>Loading your bookings...</div>;
  if (error) return <div>Error loading bookings: {error.message}</div>;

  // Separate bookings into booked and completed based on status
  const bookingsUpcoming = bookings?.filter(booking => booking.status === 'Pending') || [];
  const bookingsCompleted = bookings?.filter(booking => booking.status === 'Confirmed') || []; // Assuming 'completed' is a valid status

  const tabs = [
    {
      title: 'Booked',
      content: <BookingCardList bookings={bookingsUpcoming} />,
    },
    {
      title: 'Completed',
      content: <BookingCardList bookings={bookingsCompleted} />,
    },
  ];

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>My Bookings</h1>
        <TabPanel tabs={tabs} />
      </div>
  );
};

export default UserBookings;
