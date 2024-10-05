// BusinessCard.tsx
import Button from "@/components/common/Button/Button";
import styles from "./BusinessCard.module.scss";
import {Businesses} from "@/types/businesses";

type BusinessCardProps = {
    business: Businesses;
    isFavorite: boolean;
    toggleFavorite: (id: string) => void;
};

const BusinessCard: React.FC<BusinessCardProps> = ({ business, isFavorite, toggleFavorite }) => {
    return (
        <div className={styles.businessCard}>
            <img
                src={business.images[0].url}
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
                    {business.category}
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
