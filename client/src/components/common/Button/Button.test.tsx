// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
    test('renders button with correct text', () => {
        render(<Button>Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls onClick function when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);

        const buttonElement = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders with default type "button"', () => {
        render(<Button>Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toHaveAttribute('type', 'button');
    });

    test('renders with type "submit" when specified', () => {
        render(<Button type="submit">Submit</Button>);
        const buttonElement = screen.getByRole('button', { name: /submit/i });
        expect(buttonElement).toHaveAttribute('type', 'submit');
    });

    test('is disabled when the disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        const buttonElement = screen.getByRole('button', { name: /disabled/i });
        expect(buttonElement).toBeDisabled();
    });

    test('is not disabled when the disabled prop is false', () => {
        render(<Button>Enabled</Button>);
        const buttonElement = screen.getByRole('button', { name: /enabled/i });
        expect(buttonElement).not.toBeDisabled();
    });
});
