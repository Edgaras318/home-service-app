// BusinessCard.tsx
import Button from "@/components/common/Button/Button";
import styles from "./BusinessCard.module.scss";
import { Business } from "@/types/businesses";

type BusinessCardProps = {
    business: Business;
    isFavorite: boolean;
    toggleFavorite: (id: string) => void;
};

const BusinessCard: React.FC<BusinessCardProps> = ({ business, isFavorite, toggleFavorite }) => {
    const { photos, _id, category, contactPerson } = business;
    return (
        <div className={styles.businessCard} data-testid="business-card">
            <img
                src={business.photos[0]}
                alt={business.name}
                className={styles.businessCard__image}
                data-testid="business-image" // Add test ID for the image
            />
            <button onClick={() => toggleFavorite(business._id)} className={styles.favoriteButton} data-testid="favorite-button">
                <span className={isFavorite ? styles.favorite : styles.notFavorite} data-testid="favorite-icon">
                    ♥
                </span>
            </button>
            <div className={styles.businessCard__content} data-testid="business-content">
                <p className={styles.businessCard__content__category} data-testid="business-category">
                    {business.category.name}
                </p>
                <h2 className={styles.businessCard__content__name} data-testid="business-name">
                    {business.name}
                </h2>
                <p className={styles.businessCard__content__contact} data-testid="business-contact">
                    {business.contactPerson}
                </p>
                <p className={styles.businessCard__content__address} data-testid="business-address">
                    {business.address}
                </p>
                <Button size="medium" >Book now</Button>
            </div>
        </div>
    );
};

export default BusinessCard;
