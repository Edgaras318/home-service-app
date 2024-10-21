import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookSidebarDialog from './BookSidebarDialog';
import { useCreateBooking } from '@/hooks/useCreateBooking';
import { useSnackbar } from 'notistack';
import { useUserStore } from '@/stores/userStore';
import { User } from '@/types';

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

    const mockUser: User = {
        _id: 'user123',
        email: 'test@example.com',
        name: 'John Doe',
        age: '30',
    };

    beforeEach(() => {
        jest.clearAllMocks();

        (useSnackbar as jest.Mock).mockReturnValue({ enqueueSnackbar: jest.fn() });
        useUserStore.setState({ user: mockUser });

        (useCreateBooking as jest.Mock).mockReturnValue({
            mutateAsync: jest.fn(),
        });
    });

    const renderComponent = (props = mockProps) => {
        return render(<BookSidebarDialog {...props} />);
    };

    test('renders the dialog when open', () => {
        renderComponent();
        expect(screen.getByRole('heading', { name: /Book a Service/i })).toBeInTheDocument();
        expect(screen.getByText(/Select Date and Timeslot to book a service/i)).toBeInTheDocument();
    });

    test('closes the dialog on clicking the close button', async () => {
        renderComponent();
        fireEvent.click(screen.getByRole('button', { name: /×/i })); // Close button
        await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
    });

    test('displays an error if date or time slot is not selected', async () => {
        renderComponent();
        fireEvent.click(screen.getByText(/Confirm/i));
        expect(await screen.findByText(/Please select both date and time slot/i)).toBeInTheDocument();
    });

    test('updates the state when a time slot is selected', () => {
        renderComponent();

        // Select the time slot
        fireEvent.click(screen.getByText('10:00 AM'));

        // Check if the selected time slot is displayed correctly
        expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    });

    test('submits the booking form successfully', async () => {
        const mockCreateBooking = jest.fn().mockResolvedValue({}); // Simulate a successful response
        (useCreateBooking as jest.Mock).mockReturnValue({ mutateAsync: mockCreateBooking });
        renderComponent();

        // Select a time slot
        fireEvent.click(screen.getByText('10:00 AM'));

        // Trigger submit
        fireEvent.click(screen.getByText(/Confirm/i));

        await waitFor(() => {
            expect(mockCreateBooking).toHaveBeenCalledTimes(1); // Ensure the booking function was called
            expect(mockOnClose).toHaveBeenCalledTimes(1); // Ensure dialog closes
        });
    });

    test('displays an error message if the booking API call fails', async () => {
        const mockErrorMessage = 'Error creating booking';
        const mockCreateBooking = jest.fn().mockRejectedValue({
            response: { data: { message: mockErrorMessage } },
        });
        (useCreateBooking as jest.Mock).mockReturnValue({ mutateAsync: mockCreateBooking });

        // Suppress console.error for this specific test
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        renderComponent();

        // Select a time slot and attempt to confirm the booking
        fireEvent.click(screen.getByText('10:00 AM'));
        fireEvent.click(screen.getByText(/Confirm/i));

        // Wait for the error message to appear
        await waitFor(() => expect(screen.getByText(mockErrorMessage)).toBeInTheDocument());

        // Restore console.error to its original implementation
        consoleErrorMock.mockRestore();
    });
});
