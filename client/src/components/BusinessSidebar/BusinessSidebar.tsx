import React, {useState} from 'react';
import { GoPerson } from "react-icons/go";
import { TbClockHour4 } from "react-icons/tb";
import { RxUpload } from "react-icons/rx";
import Button from '@/components/common/Button/Button';
import styles from './BusinessSidebar.module.scss';
import SimilarBusinessCardList from "@/components/SimilarBusinessCardList/SimilarBusinessCardList";
import {Business} from "@/types";
import {CiCalendar} from "react-icons/ci";
import BookSidebarDialog from "@/components/BookSidebarDialog/BookSidebarDialog";

type SidebarProps = {
    business: Business
};

const BusinessSidebar: React.FC<SidebarProps> = ({ business }) => {
    const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

    // Handler to open the booking dialog
    const handleBookingDialog = () => {
        setIsBookingDialogOpen(!isBookingDialogOpen);
    };

    if (!business) return undefined;

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

            <Button fullWidth onClick={handleBookingDialog}><CiCalendar fontSize={24} />Book Appointment</Button>

            <div className={styles.similarBusinessesSection}>
                <h2>Similar Businesses</h2>
                <SimilarBusinessCardList />
            </div>

            <BookSidebarDialog isOpen={isBookingDialogOpen} onClose={handleBookingDialog}/>
        </div>
    );
};

export default BusinessSidebar;
