// Chip.tsx
import React from 'react';
import styles from './SelectableChipProps.module.scss';

interface SelectableChipProps {
    label: string;
    isSelected: boolean;
    isCrossed?: boolean; // Add a prop for booked slots
    onClick: () => void;
}

const SelectableChip: React.FC<SelectableChipProps> = ({ label, isSelected, isCrossed = false, onClick }) => {
    return (
        <div
            className={`${styles.chip} ${isSelected ? styles.selected : ''} ${
                isCrossed ? styles.crossed : ''
            }`}
            onClick={!isCrossed ? onClick : undefined} // Disable clicking if booked
        >
            {label}
        </div>
    );
};

export default SelectableChip;
