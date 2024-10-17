// BusinessCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import BusinessCard from './BusinessCard';
import { Business } from '@/types/businesses';
import { Category } from '@/types/categories';

// Mock Category data
const mockCategory: Category = {
    _id: 'category1',
    iconUrl: 'test-icon-url.jpg',
    name: 'Test Category',
    backgroundColor: '#000000',
};

// Mock Business data
const mockBusiness: Business = {
    _id: '1',
    name: 'Test Business',
    description: 'This is a test business description.',
    category: mockCategory,
    contactPerson: 'John Doe',
    address: '123 Test St.',
    email: 'test@business.com',
    photos: ['test-photo.jpg'],
};

// Mock the toggleFavorite function
const mockToggleFavorite = jest.fn();

describe('BusinessCard Component', () => {
    it('renders the business card correctly', () => {
        render(
            <BusinessCard
                business={mockBusiness}
                isFavorite={false}
                toggleFavorite={mockToggleFavorite}
            />
        );

        // Check if the card is rendered
        expect(screen.getByTestId('business-card')).toBeInTheDocument();

        // Check if the image is rendered with the correct src and alt text
        const imgElement = screen.getByTestId('business-image');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'test-photo.jpg');

        // Check if the business name, contact, and address are rendered
        expect(screen.getByTestId('business-name')).toHaveTextContent('Test Business');
        expect(screen.getByTestId('business-contact')).toHaveTextContent('John Doe');
        expect(screen.getByTestId('business-address')).toHaveTextContent('123 Test St.');

        // Check if the category name is rendered
        expect(screen.getByTestId('business-category')).toHaveTextContent('Test Category');

        // Check if the "Book now" button is rendered
        expect(screen.getByText(/Book now/i)).toBeInTheDocument();
    });

    it('calls toggleFavorite function when the favorite button is clicked', () => {
        render(
            <BusinessCard
                business={mockBusiness}
                isFavorite={false}
                toggleFavorite={mockToggleFavorite}
            />
        );

        // Simulate clicking the favorite button
        const favoriteButton = screen.getByTestId('favorite-button');
        fireEvent.click(favoriteButton);

        // Check if the toggleFavorite function was called with the business _id
        expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
        expect(mockToggleFavorite).toHaveBeenCalledWith('1');
    });

});
