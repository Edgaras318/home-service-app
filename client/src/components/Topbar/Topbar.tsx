// Topbar.tsx
import React from "react";
import styles from "./Topbar.module.scss";
import logo from "@/assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button/Button";
import { useUserStore } from "@/stores/userStore";
import routes from "@/routes"; // Import the routes configuration
import UserAvatar from "@/components/UserAvatar/UserAvatar"; // Import the new UserAvatar component

const Topbar: React.FC = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const navLinks = [
    { href: routes.home, label: "See our services", text: "Home" },
    { href: routes.services, label: "See our services", text: "Services" },
    { href: routes.about, label: "About us", text: "About Us" },
  ];

  const handleButtonClick = () => {
    navigate(routes.login);
  };

  const handleLogout = () => {
    clearUser();
    navigate(routes.home); // Redirect to home after logout
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.leftSide}>
        <img
          src={logo}
          alt="Company Logo"
          aria-label="Company logo"
          className={styles.logo}
        />
        <nav className={styles.nav}>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  aria-label={link.label}
                  className={styles.link}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {user ? (
        <UserAvatar username={user.username} onLogout={handleLogout} />
      ) : (
        <Button size="large" onClick={handleButtonClick}>
          Login / Sign Up
        </Button>
      )}
    </div>
  );
};

export default Topbar;
