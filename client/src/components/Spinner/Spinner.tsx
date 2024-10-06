import React from 'react';
import styles from './Spinner.module.scss'; // Importing styles from a SCSS file

const Spinner: React.FC = () => {
    return (
        <div className={styles.container}>
            <span className={styles.loader}>
            </span>
        </div>
    );
};

export default Spinner;
