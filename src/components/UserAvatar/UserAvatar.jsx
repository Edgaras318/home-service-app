import React, { useState } from 'react';
import styles from './UserAvatar.module.scss'; // Import the new styles

const UserAvatar = ({ username, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const firstLetter = username.charAt(0).toUpperCase();

    return (
        <div className={styles.avatar} onClick={toggleDropdown} aria-label="User Menu">
            {firstLetter}
            {isDropdownOpen && (
                <div className={styles.dropdown}>
                    <button onClick={onLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserAvatar;
