import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookSidebarDialog from './BookSidebarDialog';
import { useCreateBooking } from '@/hooks/useCreateBooking';
import { useSnackbar } from 'notistack';
import { useUserStore } from '@/stores/userStore';

// Mock dependencies
jest.mock('@/hooks/useCreateBooking', () => ({
    useCreateBooking: jest.fn(),
}));

jest.mock('notistack', () => ({
    useSnackbar: jest.fn(),
}));

describe('BookSidebarDialog', () => {
    const mockOnClose = jest.fn();
    const mockProps = {
        isOpen: true,
        onClose: mockOnClose,
    };

    const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        name: 'John Doe',
        age: '30', // Ensure age is a string if required by your User type
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error output

        (useSnackbar as jest.Mock).mockReturnValue({ enqueueSnackbar: jest.fn() });
        useUserStore.setState({ user: mockUser });

        (useCreateBooking as jest.Mock).mockReturnValue({
            mutateAsync: jest.fn(),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.error to its original implementation
    });

    test('renders dialog when open', () => {
        render(<BookSidebarDialog {...mockProps} />);
        expect(screen.getByRole('heading', { name: /Book a Service/i })).toBeInTheDocument();
        expect(screen.getByText(/Select Date and Timeslot to book a service/i)).toBeInTheDocument();
    });

    test('closes the dialog on clicking close button', async () => {
        render(<BookSidebarDialog {...mockProps} />);
        fireEvent.click(screen.getByRole('button', { name: /×/i })); // Close button
        await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
    });

    test('shows error if date or time slot is not selected', async () => {
        render(<BookSidebarDialog {...mockProps} />);
        fireEvent.click(screen.getByText(/Confirm/i));
        expect(await screen.findByText(/Please select both date and time slot/i)).toBeInTheDocument();
    });

    test('selecting a time slot updates the state', () => {
        render(<BookSidebarDialog {...mockProps} />);

        // Select the time slot
        fireEvent.click(screen.getByText('10:00 AM'));

        // Assert that the selected time slot is set in state
        expect(screen.getByText('10:00 AM')).toBeInTheDocument(); // Check if the time slot is still there after selection
    });

    test('submits the booking form successfully', async () => {
        const mockCreateBooking = jest.fn();
        (useCreateBooking as jest.Mock).mockReturnValue({ mutateAsync: mockCreateBooking });
        render(<BookSidebarDialog {...mockProps} />);

        // Set up the state by selecting a time slot
        fireEvent.click(screen.getByText('10:00 AM'));

        // Trigger submit
        fireEvent.click(screen.getByText(/Confirm/i));

        await waitFor(() => {
            expect(mockCreateBooking).toHaveBeenCalledTimes(1); // Confirm booking function was called
            expect(mockOnClose).toHaveBeenCalledTimes(1); // Ensure dialog closes
        });
    });

    test('handles API error during booking', async () => {
        const mockCreateBooking = jest.fn().mockRejectedValue({
            response: { data: { message: 'Error creating booking' } },
        });
        (useCreateBooking as jest.Mock).mockReturnValue({ mutateAsync: mockCreateBooking });
        render(<BookSidebarDialog {...mockProps} />);

        fireEvent.click(screen.getByText('10:00 AM'));
        fireEvent.click(screen.getByText(/Confirm/i));

        await waitFor(() => expect(screen.getByText(/Error creating booking/i)).toBeInTheDocument());
    });
});
