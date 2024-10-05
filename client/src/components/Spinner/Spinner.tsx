import React from 'react';
import styles from './Spinner.module.scss'; // Importing styles from a SCSS file

const Spinner: React.FC = () => {
    return (
        <span className={styles.loader}>
        </span>
    );
};

export default Spinner;
