// TabPanel.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TabPanel from './TabPanel';

const mockTabs = [
    { title: 'Tab 1', content: <div>Content 1</div> },
    { title: 'Tab 2', content: <div>Content 2</div> },
    { title: 'Tab 3', content: <div>Content 3</div> },
];

describe('TabPanel Component', () => {
    beforeEach(() => {
        render(<TabPanel tabs={mockTabs} />);
    });

    it('renders all tab headers', () => {
        const tabButtons = screen.getAllByRole('button');
        expect(tabButtons).toHaveLength(mockTabs.length);
        mockTabs.forEach((tab) => {
            expect(screen.getByText(tab.title)).toBeInTheDocument();
        });
    });

    it('displays the content of the active tab', () => {
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('changes content when a different tab is clicked', () => {
        const tabButtons = screen.getAllByRole('button');

        // Click on "Tab 2"
        fireEvent.click(tabButtons[1]);

        expect(screen.getByText('Content 2')).toBeInTheDocument();
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('ensures only one tab content is displayed at a time', () => {
        const tabButtons = screen.getAllByRole('button');

        // Click on "Tab 3"
        fireEvent.click(tabButtons[2]);

        expect(screen.getByText('Content 3')).toBeInTheDocument();
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('uses data-testid for easier targeting', () => {
        const tabButtons = screen.getAllByRole('button');
        tabButtons.forEach((button, index) => {
            expect(button).toHaveAttribute('data-testid', `tab-button-${index}`);
        });
    });
});
