import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingCardList from './BookingCardList'; // Adjust the import path as needed
import { BookingCard as BookingCardType } from "@/types/bookings";

// Mock a booking object for testing purposes
const mockBooking: BookingCardType = {
    _id: 'booking1',
    businessId: {
        _id: 'business1',
        name: 'Test Business',
        address: '123 Test Street',
        description: 'A great place for services',
        category: {
            _id: 'cat1',
            iconUrl: 'https://example.com/icon.png',
            name: 'Services',
            backgroundColor: '#FFFFFF',
        },
        contactPerson: 'Jane Doe',
        email: 'contact@testbusiness.com',
        photos: ['https://example.com/photo.jpg'],
    },
    date: new Date('2024-10-18T10:00:00Z'),
    time: '10:00 AM',
    userName: 'John Doe',
    status: 'confirmed',
};

// Mock a list of bookings
const mockBookings: BookingCardType[] = [mockBooking, { ...mockBooking, _id: 'booking2' }];

describe('BookingCardList Component', () => {

    test('renders a list of bookings', () => {
        // Render the component with multiple bookings
        render(<BookingCardList bookings={mockBookings} />);

        // Check that the correct number of BookingCard components are rendered
        const bookingCards = screen.getAllByRole('heading', { level: 3 });
        expect(bookingCards).toHaveLength(mockBookings.length);

        // Optionally, check the first booking's name is rendered correctly
        expect(bookingCards[0]).toHaveTextContent(mockBookings[0].businessId.name);
    });

    test('renders "No bookings found" when there are no bookings', () => {
        // Render the component with an empty bookings array
        render(<BookingCardList bookings={[]} />);

        // Check that the "No bookings found." message is displayed
        const noBookingsMessage = screen.getByText(/No bookings found/i);
        expect(noBookingsMessage).toBeInTheDocument();
    });
});
