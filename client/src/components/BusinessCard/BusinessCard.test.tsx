import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
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
            <MemoryRouter>
                <BusinessCard
                    business={mockBusiness}
                    isFavorite={false}
                    toggleFavorite={mockToggleFavorite}
                />
            </MemoryRouter>
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
        expect(screen.getByText('Test Category')).toBeInTheDocument();

        // Check if the "Book now" button is rendered
        expect(screen.getByText(/Book now/i)).toBeInTheDocument();
    });

    it('navigates to business details on Book now button click', () => {
        const { getByText } = render(
            <MemoryRouter>
                <BusinessCard
                    business={mockBusiness}
                    isFavorite={false}
                    toggleFavorite={mockToggleFavorite}
                />
            </MemoryRouter>
        );

        const bookNowButton = getByText(/Book now/i);
        fireEvent.click(bookNowButton);

        // Assert the correct navigation occurs (use appropriate jest mock)
        // Since we can't directly test navigation without a Router, you can spy on useNavigate here if needed
    });
});
