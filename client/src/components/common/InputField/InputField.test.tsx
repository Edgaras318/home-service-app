// InputField.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField"; // Adjust the import according to your file structure

describe("InputField Component", () => {
    // Test if the component renders with label and placeholder
    test("renders the label and placeholder", () => {
        render(<InputField label="Email" id="email" placeholder="Enter your email" />);

        const label = screen.getByText(/email/i);
        const input = screen.getByPlaceholderText(/enter your email/i);

        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    });

    // Test if the error message is displayed when error prop is passed
    test("displays an error message", () => {
        render(<InputField label="Password" id="password" error="Required field" />);

        const errorMessage = screen.getByText(/required field/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // Test if the input value changes correctly on user input
    test("allows user to type in the input field", () => {
        render(<InputField label="Username" id="username" />);

        const input = screen.getByLabelText(/username/i);
        fireEvent.change(input, { target: { value: 'myUsername' } });

        expect(input).toHaveValue('myUsername');
    });

    // Test if the input field has the correct type
    test("input type is set correctly", () => {
        render(<InputField label="Password" id="password" type="password" />);

        const input = screen.getByLabelText(/password/i);
        expect(input).toHaveAttribute("type", "password");
    });

    // Test if the error message is removed when error prop is not passed
    test("does not display an error message when error prop is not provided", () => {
        render(<InputField label="Email" id="email" />);

        const errorMessage = screen.queryByText(/required field/i);
        expect(errorMessage).not.toBeInTheDocument();
    });
});
