import React from 'react';
import { GoPerson } from "react-icons/go";
import { TbClockHour4 } from "react-icons/tb";
import { RxUpload } from "react-icons/rx";
import Button from '@/components/common/Button/Button';
import styles from './BusinessSidebar.module.scss';

type SidebarProps = {
    business: {
        contactPerson: string;
    };
};

const BusinessSidebar: React.FC<SidebarProps> = ({ business }) => {
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarTop}>
                <div className={styles.upload}>
                    <Button>
                        <RxUpload size={20} />
                    </Button>
                </div>
                <div className={styles.contactPerson}>
                    <GoPerson size={26} />
                    <p>{business.contactPerson}</p>
                </div>
                <div className={styles.availability}>
                    <TbClockHour4 size={26} />
                    <p>Available 8:00 AM to 10:00 PM</p>
                </div>
            </div>
            <Button fullWidth>Book Appointment</Button>
            <div className={styles.similarBusinesses}>
                <h2>Similar Businesses</h2>
                <ul>
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

export default BusinessSidebar;
