import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TabPanel from "@/components/common/TabPanel/TabPanel";
import BookingCardList from "@/components/BookingCardList/BookingCardList";
import styles from './UserBookings.module.scss';
import { useBookings } from '@/hooks/useBookings';
import Spinner from "@/components/Spinner/Spinner";

interface UserBookingParams {
  email?: string;
  [key: string]: string | undefined;
}

const UserBookings: React.FC = () => {
  const { email } = useParams<UserBookingParams>();
  const { data: bookings, isLoading, error, refetch } = useBookings(email || ''); // Ensure email is defined

  // Refetch bookings when the component mounts or the email changes
  useEffect(() => {
    if (email) {
      refetch();
    }
  }, [email, refetch]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading bookings: {error.message}</div>;

  // Separate bookings into upcoming and completed based on status
  const bookingsUpcoming = bookings?.filter(booking => booking.status === 'Pending') || [];
  const bookingsCompleted = bookings?.filter(booking => booking.status === 'Confirmed') || [];

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
