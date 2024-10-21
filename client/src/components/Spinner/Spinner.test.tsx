// Spinner.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
    it('renders without crashing', () => {
        const { getByRole } = render(<Spinner />);
        const spinner = getByRole('spinner');
        expect(spinner).toBeInTheDocument(); // Check if the spinner is rendered
    });

    it('renders the loader span', () => {
        const { getByRole } = render(<Spinner />);
        const spinner = getByRole('spinner');
        const loader = spinner.querySelector('span'); // Get the loader span
        expect(loader).toBeInTheDocument(); // Check if the loader span is present
    });
});
