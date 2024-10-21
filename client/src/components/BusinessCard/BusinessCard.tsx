import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "@/components/common/Button/Button";
import styles from "./BusinessCard.module.scss";
import { Business } from "@/types/businesses";
import routes from "@/routes";
import Chip from '@/components/common/Chip/Chip';
import { useUserStore } from "@/stores/userStore";

type BusinessCardProps = {
    business: Business;
    isFavorite: boolean;
    toggleFavorite: (id: string) => void;
};

const BusinessCard: React.FC<BusinessCardProps> = ({ business, isFavorite, toggleFavorite }) => {
    const { photos, _id, category, contactPerson } = business;
    const navigate = useNavigate();
    const { user } = useUserStore();

    const handleBookNowClick = () => {
        if (_id) {
            navigate(routes.businessDetails(_id)); // Use the routes object for navigation
        } else {
            console.error("Business ID is missing. Cannot navigate to the details page.");
        }
    };

    return (
        <div className={styles.businessCard}>
            <img
                src={photos[0]}
                alt={business.name}
                className={styles.businessCard__image}
            />
            <button onClick={() => toggleFavorite(_id)} className={styles.favoriteButton}>
                <span className={isFavorite ? styles.favorite : styles.notFavorite}>
                    ♥
                </span>
            </button>
            <div className={styles.businessCard__content}>
                <Chip label={category.name} />
                <h2 className={styles.businessCard__content__name}>
                    {business.name}
                </h2>
                <p className={styles.businessCard__content__contact}>
                    {contactPerson}
                </p>
                <p className={styles.businessCard__content__address}>
                    {business.address}
                </p>
                {user && (
                    <Button size="medium" onClick={handleBookNowClick}>Book now</Button>
                )}
            </div>
        </div>
    );
};

export default BusinessCard;
