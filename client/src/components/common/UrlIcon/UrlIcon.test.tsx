// UrlIcon.test.tsx

import React from "react";
import { render } from "@testing-library/react";
import UrlIcon from "./UrlIcon";

describe("UrlIcon Component", () => {
    it("renders without crashing", () => {
        const { getByTestId } = render(<UrlIcon url="https://example.com/icon.png" />);
        const icon = getByTestId("url-icon");
        expect(icon).toBeInTheDocument(); // Check if the icon is rendered
    });

    it("renders with the correct URL as maskImage", () => {
        const url = "https://example.com/icon.png";
        const { getByTestId } = render(<UrlIcon url={url} />);
        const icon = getByTestId("url-icon");
        expect(icon).toHaveStyle(`mask-image: url(${url})`); // Verify the maskImage style
    });

    it("applies default size and color when not specified", () => {
        const { getByTestId } = render(<UrlIcon url="https://example.com/icon.png" />);
        const icon = getByTestId("url-icon");
        expect(icon).toHaveStyle("width: 24px"); // Default size
        expect(icon).toHaveStyle("height: 24px"); // Default size
        expect(icon).toHaveStyle("background-color: #000"); // Default color
    });

    it("applies custom size and color when specified", () => {
        const { getByTestId } = render(<UrlIcon url="https://example.com/icon.png" size={48} color="#ff0000" />);
        const icon = getByTestId("url-icon");
        expect(icon).toHaveStyle("width: 48px"); // Custom size
        expect(icon).toHaveStyle("height: 48px"); // Custom size
        expect(icon).toHaveStyle("background-color: #ff0000"); // Custom color
    });

    it("applies additional inline styles", () => {
        const { getByTestId } = render(<UrlIcon url="https://example.com/icon.png" style={{ border: "1px solid blue" }} />);
        const icon = getByTestId("url-icon");
        expect(icon).toHaveStyle("border: 1px solid blue"); // Custom inline style
    });
});
