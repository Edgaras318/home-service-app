// SimilarBusinessCard.tsx
import React from 'react';
import styles from './SimilarBusinessCard.module.scss';

type SimilarBusinessCardProps = {
    name: string;
    contactPerson: string;
    address: string;
    photo: string;
};

const SimilarBusinessCard: React.FC<SimilarBusinessCardProps> = ({ name, contactPerson, address, photo }) => {
    return (
        <div className={styles.similarBusinessCard}>
            <img src={photo} alt={name} className={styles.similarBusinessCard__image} />
            <div className={styles.similarBusinessCard__content}>
                <h3 className={styles.businessName}>{name}</h3>
                <p className={styles.contactPerson}>{contactPerson}</p>
                <div className={styles.address}>
                    <span>{address}</span>
                </div>
            </div>
        </div>
    );
};

export default SimilarBusinessCard;
