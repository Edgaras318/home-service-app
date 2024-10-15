import React from 'react';
import Chip from '@/components/common/Chip/Chip';
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";
import styles from './BusinessInfo.module.scss';

type BusinessInfoProps = {
    business: {
        name: string;
        address: string;
        email: string;
        category: { name: string };
        description: string;
        photos: string[];
    };
};

const BusinessInfo: React.FC<BusinessInfoProps> = ({ business }) => {
    return (
        <div className={styles.businessInfoContainer}>
            <div className={styles.header}>
                <div className={styles.businessImage}>
                    <img src={business.photos[0]} alt={business.name} />
                </div>
                <div>
                    <Chip label={business.category.name} />
                    <h1 className={styles.businessName}>{business.name}</h1>
                    <div className={styles.details}>
                        <div className={styles.iconText}>
                            <SlLocationPin size={20} />
                            <span>{business.address}</span>
                        </div>
                        <div className={styles.iconText}>
                            <MdOutlineEmail size={20} />
                            <span>{business.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                <h2>Description</h2>
                <p>{business.description}</p>
            </div>
        </div>
    );
};

export default BusinessInfo;
