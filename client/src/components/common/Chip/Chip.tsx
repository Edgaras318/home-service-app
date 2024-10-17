// src/components/Chip/Chip.tsx

import React from "react";
import styles from "./Chip.module.scss"; // Updated SCSS file for the Chip component

type ChipProps = {
    label: string;
};

const Chip: React.FC<ChipProps> = ({ label }) => {
    return (
        <p className={styles.chip}>
            {label}
        </p>
    );
};

export default Chip;
