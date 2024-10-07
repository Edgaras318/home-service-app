import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BusinessDetails.module.scss';
import {ApiService} from "@/services/api-services";
import { Business } from '@/types/index';
import Chip from '@/components/common/Chip/Chip'
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";

type Params = {
    business_id?: string;
};

const BusinessDetails: React.FC = () => {
    const { business_id } = useParams<Params>();
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
        <div className={styles.container}>
            <div className={styles.businessContainer}>
                {/* Main business info */}
                <div className={styles.mainBusinessInfoContainer}>
                    <div className={styles.image}>
                        <img src={business.photos[0]} alt={`Gallery ${business_id}`}/>
                    </div>
                    <div>
                        <Chip label={business.category.name}/>
                        <h1 className={styles.title}>{business.name}</h1>
                        <div className={styles.infoRow}>
                            <div className={styles.iconTextContainer}>
                                <SlLocationPin fontSize={20} />
                                <span className={styles.address}>{business.address}</span>
                            </div>
                            <div className={styles.iconTextContainer}>
                                <MdOutlineEmail fontSize={20}/>
                                <span className={styles.email}>{business.email}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.description}>
                    <h2>Description</h2>
                    <p>{business.description}</p>
                </div>

                <div className={styles.gallery}>
                    <h2>Gallery</h2>
                    <div className={styles.galleryImages}>
                        {business.photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Gallery ${index}`}/>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar with similar businesses */}
            <div className={styles.rightContainer}>
                <p className={styles.contactPerson}>Contact: {business.contactPerson}</p>
                <button className={styles.bookButton}>Book Appointment</button>
                <h2>Similar Businesses</h2>
                <ul className={styles.similarBusinesses}>
                    {/* Here you would map over similar businesses fetched separately */}
                    {/* This is just placeholder data */}
                    <li>
                        <p>House Cleaning</p>
                        <p>123 Main St, City</p>
                    </li>
                    <li>
                        <p>Bathroom Cleaning</p>
                        <p>456 Second St, City</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BusinessDetails;
