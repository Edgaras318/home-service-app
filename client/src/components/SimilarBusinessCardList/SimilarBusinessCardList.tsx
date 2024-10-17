// SimilarBusinessCardList.tsx
import React from 'react';
import SimilarBusinessCard from '@/components/SimilarBusinessCard/SimilarBusinessCard';
import styles from './SimilarBusinessCardList.module.scss';
import {useBusinesses} from "@/hooks/useBusinesses";
import Spinner from "@/components/Spinner/Spinner";

const SimilarBusinessCardList: React.FC = () => {

    const { data: businesses, error, isLoading } = useBusinesses();

    if (isLoading) {
        return (
            <div className={styles.sidebarContainer}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.sidebarContainer}>
                <p>Error loading similar businesses. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className={styles.similarBusinessCardList}>
            {businesses?.map((business, index) => (
                <SimilarBusinessCard
                    key={index}
                    name={business.name}
                    contactPerson={business.contactPerson}
                    address={business.address}
                    photo={business.photos[0]}
                />
            ))}
        </div>
    );
};

export default SimilarBusinessCardList;
