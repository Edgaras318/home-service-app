import React, { useState, useEffect } from 'react';
import styles from './Topbar.module.scss';
import logo from '@/assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Button from "@/components/common/Button/Button";
import { useUserStore } from '@/stores/userStore';
import routes from '@/routes'; // Import the routes configuration
import UserAvatar from '@/components/UserAvatar/UserAvatar'; // Import the new UserAvatar component

const Topbar = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const navLinks = [
    { href: routes.home, label: 'See our services', text: 'Home' },
    { href: routes.services, label: 'See our services', text: 'Services' },
    { href: routes.about, label: 'About us', text: 'About Us' },
  ];

  const handleButtonClick = () => {
    navigate(routes.login);
  };

  const handleLogout = () => {
    clearUser();
    navigate(routes.home); // Redirect to home after logout
  };

  useEffect(() => {
    // No need to handle dropdown here anymore since it's moved to UserAvatar
  }, [user]);

  return (
      <div className={styles.topbar}>
        <div className={styles.leftSide}>
          <img
              src={logo}
              alt='Logo'
              aria-label='Company logo'
              className={styles.logo}
          />
          <nav className={styles.nav}>
            <ul>
              {navLinks.map((link, index) =>
                  <li key={index}>
                    <Link to={link.href} aria-label={link.label}>
                      {link.text}
                    </Link>
                  </li>
              )}
            </ul>
          </nav>
        </div>
        {user ? (
            <UserAvatar username={user.username} onLogout={handleLogout} />
        ) : (
            <Button size="large" text="Login / Sign Up" onClick={handleButtonClick} />
        )}
      </div>
  );
};

export default Topbar;
