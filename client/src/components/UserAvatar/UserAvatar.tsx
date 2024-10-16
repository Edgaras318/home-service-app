// UserAvatar.tsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./UserAvatar.module.scss";

interface UserAvatarProps {
  username: string;
  onLogout: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ username, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Close dropdown if user clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className={styles.avatarWrapper}>
      <button
        className={styles.avatar}
        onClick={toggleDropdown}
        aria-label="User Menu"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleDropdown();
          }
        }}
      >
        {firstLetter}
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <button onClick={onLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
