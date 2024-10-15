import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from "@/services/api-services";
import { Business } from '@/types/index';
import BusinessInfo from '@/components/BusinessInfo/BusinessInfo';
import BusinessGallery from '@/components/BusinessGallery/BusinessGallery';
import BusinessSidebar from '@/components/BusinessSidebar/BusinessSidebar';
import styles from './BusinessDetails.module.scss';

const BusinessDetails: React.FC = () => {
    const { business_id } = useParams<{ business_id?: string }>();
    const [business, setBusiness] = useState<Business | null>(null);

    useEffect(() => {
        if (business_id) {
            ApiService.getBusinessById(business_id)
                .then(response => setBusiness(response.data))
                .catch(error => console.error('Error fetching business details:', error));
        }
    }, [business_id]);

    if (!business) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.businessDetailsContainer}>
            <div className={styles.mainContent}>
                <BusinessInfo business={business} />
                <BusinessGallery photos={business.photos} />
            </div>
            <BusinessSidebar business={business} />
        </div>
    );
};

export default BusinessDetails;
