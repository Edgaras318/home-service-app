// HeroSection.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
    test("renders HeroSection component", () => {
        render(<HeroSection />);

        // Check if the h1 tag is rendered correctly
        expect(screen.getByRole('heading', { name: /Find Home Service\/Repair Near You/i })).toBeInTheDocument();

        // Checking if the paragraph is rendered correctly
        expect(screen.getByText(/Explore Best Home Service & Repair near you/i)).toBeInTheDocument();

        // Assuming that SearchBar also appears on screen
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    });
});
