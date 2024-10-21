import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingCard from './BookingCard';
import { BookingCard as BookingCardType } from "@/types/bookings";

// Mocking a category object with all required properties
const mockCategory = {
    _id: 'cat1',
    iconUrl: 'https://example.com/icon.png',
    name: 'Services',
    backgroundColor: '#FFFFFF',
};

// Mocking a businessId object with all required properties
const mockBusinessId = {
    _id: '1',
    name: 'Test Business',
    address: '123 Test Street',
    description: 'A great place for services',
    category: mockCategory,
    contactPerson: 'Jane Doe',
    email: 'contact@testbusiness.com',
    photos: ['https://example.com/photo.jpg'],
};

const mockProps: BookingCardType = {
    businessId: mockBusinessId,
    date: new Date('2024-10-18T10:00:00Z'),
    time: '10:00 AM',
    userName: 'John Doe',
    status: 'confirmed',
};

describe('BookingCard Component', () => {
    // Test to ensure the business name is displayed
    test('renders the business name', () => {
        render(<BookingCard {...mockProps} />);

        // Check business name using heading role (h3)
        const businessName = screen.getByRole('heading', { level: 3 });
        expect(businessName).toHaveTextContent(mockBusinessId.name);
    });

    // Test to ensure the user name is displayed
    test('renders the user name', () => {
        render(<BookingCard {...mockProps} />);

        // Check user name by its text content
        const userNameElement = screen.getByText(mockProps.userName);
        expect(userNameElement).toBeInTheDocument();
    });

    // Test to ensure the address is displayed
    test('renders the address', () => {
        render(<BookingCard {...mockProps} />);

        // Check address by its text content
        const addressElement = screen.getByText(mockBusinessId.address);
        expect(addressElement).toBeInTheDocument();
    });

    // Test to ensure the service date is displayed correctly
    test('renders the service date', () => {
        render(<BookingCard {...mockProps} />);

        // Check if date is correctly formatted and rendered
        const dateElement = screen.getByText('10/18/2024');
        expect(dateElement).toBeInTheDocument();
    });

    // Test to ensure the service time is displayed
    test('renders the service time', () => {
        render(<BookingCard {...mockProps} />);

        // Check time by its text content
        const timeElement = screen.getByText(mockProps.time);
        expect(timeElement).toBeInTheDocument();
    });

    // Test that the image is rendered when photos are available
    test('renders image if photos are available', () => {
        render(<BookingCard {...mockProps} />);

        // Check image using the alt attribute
        const imgElement = screen.getByAltText(mockBusinessId.name);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', mockBusinessId.photos[0]);
    });

    // Test that the image is not rendered when no photos are available
    test('does not render image if no photos are available', () => {
        const propsWithoutPhotos = {
            ...mockProps,
            businessId: { ...mockBusinessId, photos: [] }
        };

        render(<BookingCard {...propsWithoutPhotos} />);

        // Image should not be in the document if no photos exist
        const imgElement = screen.queryByAltText(mockBusinessId.name);
        expect(imgElement).not.toBeInTheDocument();
    });
});
