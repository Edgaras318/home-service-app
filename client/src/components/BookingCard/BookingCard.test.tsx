// BookingCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingCard from './BookingCard';
import { BookingCard as BookingCardType } from "@/types/bookings";

// Mocking a category object with all required properties
const mockCategory = {
    _id: 'cat1',
    iconUrl: 'https://example.com/icon.png',
    name: 'Services',
    backgroundColor: '#FFFFFF', // or any color you prefer
};

// Mocking a businessId object with all required properties
const mockBusinessId = {
    _id: '1',
    name: 'Test Business',
    address: '123 Test Street',
    description: 'A great place for services',
    category: mockCategory, // Ensure this is of type Category
    contactPerson: 'Jane Doe',
    email: 'contact@testbusiness.com',
    photos: ['https://example.com/photo.jpg'],
};

const mockProps: BookingCardType = {
    businessId: mockBusinessId,
    date: new Date('2024-10-18T10:00:00Z'), // Date type
    time: '10:00 AM',
    userName: 'John Doe',
    status: 'confirmed', // Add a status property
};

describe('BookingCard Component', () => {
    test('renders BookingCard with correct details', () => {
        render(<BookingCard {...mockProps} />);

        // Check if business name is rendered
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(mockBusinessId.name);

        // Check if user name is rendered
        expect(screen.getByText(mockProps.userName)).toBeInTheDocument();

        // Check if address is rendered
        expect(screen.getByText(mockBusinessId.address)).toBeInTheDocument();

        const serviceOnLabels = screen.getAllByText(/Service on:/);
        expect(serviceOnLabels).toHaveLength(2);  // Expect two occurrences

        // Check if service time is rendered correctly
        expect(screen.getByText(mockProps.time)).toBeInTheDocument();

        // Check if the image is rendered
        const img = screen.getByAltText(mockBusinessId.name);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockBusinessId.photos[0]);
    });

    test('does not render image if no photos are available', () => {
        const propsWithoutPhotos = {
            ...mockProps,
            businessId: { ...mockBusinessId, photos: [] }
        };

        render(<BookingCard {...propsWithoutPhotos} />);

        // The image should not be in the document
        const img = screen.queryByAltText(mockBusinessId.name);
        expect(img).not.toBeInTheDocument();
    });
});
