// HeroSection.tsx
import React from 'react';
import styles from "./HeroSection.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";

const HeroSection: React.FC = () => {
    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>
                Find Home <span className={styles.primary}>Service/Repair</span>
                <br /> Near You
            </h1>
            <p className={styles.subtitle}>
                Explore Best Home Service & Repair near you
            </p>
            <SearchBar />
        </div>
    );
};

export default HeroSection;
