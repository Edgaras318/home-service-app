import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingCardList from './BookingCardList';
import { BookingCard as BookingCardType } from "@/types";

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
const mockBookings: BookingCardType[] = [
    mockBooking,
    { ...mockBooking, _id: 'booking2' }
];

describe('BookingCardList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test to avoid state carryover
    });

    test('renders a list of bookings', () => {
        render(<BookingCardList bookings={mockBookings} />);

        // Use getAllByText to get all instances of "Test Business"
        const businessNames = screen.getAllByText('Test Business');
        expect(businessNames).toHaveLength(mockBookings.length); // Check for the expected number
    });


    test('renders "No bookings found" when there are no bookings', () => {
        render(<BookingCardList bookings={[]} />);

        // Check that the "No bookings found." message is displayed
        const noBookingsMessage = screen.getByText(/No bookings found/i);
        expect(noBookingsMessage).toBeInTheDocument();
    });

    test('handles single booking correctly', () => {
        render(<BookingCardList bookings={[mockBooking]} />);

        // Check if the single booking is rendered correctly
        expect(screen.getByText(mockBooking.businessId.name)).toBeInTheDocument();
        expect(screen.getByText(mockBooking.businessId.address)).toBeInTheDocument();
    });

    test('does not render booking cards when bookings are empty', () => {
        render(<BookingCardList bookings={[]} />);

        // Ensure no booking cards are rendered
        const bookingCards = screen.queryAllByRole('heading', { level: 3 });
        expect(bookingCards).toHaveLength(0);
    });
});
