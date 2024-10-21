// src/components/Chip/Chip.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Chip from "./Chip";

describe("Chip Component", () => {
    // Test to check if the Chip renders with the correct label
    test("renders with the correct label", () => {
        const testLabel = "Test Chip";
        render(<Chip label={testLabel} />);
        const chipElement = screen.getByText(testLabel);
        expect(chipElement).toBeInTheDocument();
    });

    // Test to check if the Chip renders without crashing
    test("renders without crashing", () => {
        const { container } = render(<Chip label="Another Chip" />);
        expect(container).toBeInTheDocument();
    });

    // Test to check if the Chip renders empty when no label is provided
    test("renders without crashing with no label", () => {
        const { container } = render(<Chip label="" />);
        expect(container).toBeInTheDocument();
    });
});
