import React from 'react';
import styles from './BusinessGallery.module.scss';

type BusinessGalleryProps = {
    photos: string[];
};

const BusinessGallery: React.FC<BusinessGalleryProps> = ({ photos }) => {
    return (
        <div className={styles.galleryContainer}>
            <h2>Gallery</h2>
            <div className={styles.galleryImages}>
                {photos.map((photo, index) => (
                    <img key={index} src={photo} alt={`Gallery image ${index}`} />
                ))}
            </div>
        </div>
    );
};

export default BusinessGallery;
