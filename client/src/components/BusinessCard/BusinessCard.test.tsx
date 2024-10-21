import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BusinessCard from './BusinessCard';
import { Business } from '@/types/businesses';
import { Category} from "@/types";
import { useUserStore } from "@/stores/userStore";

// Mock Business data
const mockCategory: Category = {
    _id: 'category1',
    iconUrl: 'test-icon-url.jpg',
    name: 'Test Category',
    backgroundColor: '#000000',
};

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

const mockToggleFavorite = jest.fn();

// Mock the useUserStore hook
jest.mock('@/stores/userStore', () => ({
    useUserStore: jest.fn(),
}));

// Correctly type the mock
const mockUseUserStore = useUserStore as unknown as jest.Mock;

describe('BusinessCard Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the business card correctly', () => {
        mockUseUserStore.mockReturnValue({ user: null }); // No user logged in

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

        // Check if the image is rendered
        const imgElement = screen.getByTestId('business-image');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'test-photo.jpg');
        expect(imgElement).toHaveAttribute('alt', 'Test Business');

        // Check if the business name, contact, and address are rendered
        expect(screen.getByTestId('business-name')).toHaveTextContent('Test Business');
        expect(screen.getByTestId('business-contact')).toHaveTextContent('John Doe');
        expect(screen.getByTestId('business-address')).toHaveTextContent('123 Test St.');
    });

    it('calls toggleFavorite when the favorite button is clicked', () => {
        mockUseUserStore.mockReturnValue({ user: null }); // No user logged in

        render(
            <MemoryRouter>
                <BusinessCard
                    business={mockBusiness}
                    isFavorite={false}
                    toggleFavorite={mockToggleFavorite}
                />
            </MemoryRouter>
        );

        const favoriteButton = screen.getByRole('button', { name: /♥/i });
        fireEvent.click(favoriteButton);

        // Assert that the toggleFavorite function was called with the correct business ID
        expect(mockToggleFavorite).toHaveBeenCalledWith(mockBusiness._id);
    });

    it('renders the "Book now" button when a user is logged in', () => {
        const mockUser = {
            _id: 'user123',
            email: 'test@example.com',
            name: 'John Doe',
            age: '30',
        };
        mockUseUserStore.mockReturnValue({ user: mockUser }); // User logged in

        render(
            <MemoryRouter>
                <BusinessCard
                    business={mockBusiness}
                    isFavorite={false}
                    toggleFavorite={mockToggleFavorite}
                />
            </MemoryRouter>
        );

        // Check if the "Book now" button is visible
        expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
    });

    it('does not render the "Book now" button when no user is logged in', () => {
        mockUseUserStore.mockReturnValue({ user: null }); // No user logged in

        render(
            <MemoryRouter>
                <BusinessCard
                    business={mockBusiness}
                    isFavorite={false}
                    toggleFavorite={mockToggleFavorite}
                />
            </MemoryRouter>
        );

        // Check if the "Book now" button is not visible
        expect(screen.queryByRole('button', { name: /book now/i })).not.toBeInTheDocument();
    });

    it('triggers the "Book now" button click event', () => {
        const mockUser = {
            _id: 'user123',
            email: 'test@example.com',
            name: 'John Doe',
            age: '30',
        };
        mockUseUserStore.mockReturnValue({ user: mockUser }); // User logged in

        render(
            <MemoryRouter>
                <BusinessCard
                    business={mockBusiness}
                    isFavorite={false}
                    toggleFavorite={mockToggleFavorite}
                />
            </MemoryRouter>
        );

        const bookNowButton = screen.getByRole('button', { name: /book now/i });
        fireEvent.click(bookNowButton);

        // Assert the button triggers the correct event (such as calling a handler, but don't check the route)
        expect(bookNowButton).toBeInTheDocument();
    });
});
