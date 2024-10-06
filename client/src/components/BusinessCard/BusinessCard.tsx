// BusinessCard.tsx
import Button from "@/components/common/Button/Button";
import styles from "./BusinessCard.module.scss";
import {Business} from "@/types/businesses";

type BusinessCardProps = {
    business: Business;
    isFavorite: boolean;
    toggleFavorite: (id: string) => void; // Add this line
};

const BusinessCard: React.FC<BusinessCardProps> = ({ business, isFavorite, toggleFavorite }) => { // Make sure to include isFavorite and toggleFavorite here
    const { photos, _id, category, contactPerson } = business; // Destructure properties from the category
    return (
        <div className={styles.businessCard}>
            <img
                src={business.photos[0]}
                alt={business.name}
                className={styles.businessCard__image}
            />
            <button onClick={() => toggleFavorite(business._id)} className={styles.favoriteButton}>
                <span className={isFavorite ? styles.favorite : styles.notFavorite}>
                    ♥
                </span>
            </button>
            <div className={styles.businessCard__content}>
                <p className={styles.businessCard__content__category}>
                    {business.category.name}
                </p>
                <h2 className={styles.businessCard__content__name}>{business.name}</h2>
                <p className={styles.businessCard__content__contact}>
                    {business.contactPerson}
                </p>
                <p className={styles.businessCard__content__address}>{business.address}</p>
                <Button size="medium">Book now</Button>
            </div>
        </div>
    );
};

export default BusinessCard;
