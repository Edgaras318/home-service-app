import React, { useEffect, useState } from 'react';
import styles from './BookSidebarDialog.module.scss';
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';
import SelectableChip from "@/components/SelectableChip/SelectableChip";
import Button from "@/components/common/Button/Button";
import { ErrorResponseData } from "@/types/errors";
import {useCreateBooking} from '@/hooks/useCreateBooking'
import { useSnackbar } from "notistack";
import { useParams} from "react-router-dom";
import {useUserStore} from "@/stores/userStore";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const timeSlots = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
];

const bookedTimeSlots = ['']; // Replace with real data for booked slots

interface BookSidebarDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const BookSidebarDialog: React.FC<BookSidebarDialogProps> = ({ isOpen, onClose }) => {
    const [date, setDate] = useState<Value>(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [isAnimating, setAnimating] = useState(isOpen);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { mutateAsync: createBooking } = useCreateBooking();
    const { business_id } = useParams<{ business_id?: string }>();
    const { user } = useUserStore();

    const handleTimeSlotChange = (time: string) => {
        setSelectedTimeSlot(time);
    };

    const handleClose = () => {
        setAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
        setError("");
    };

    const handleConfirmBooking = async () => {
        if (!date || !selectedTimeSlot) {
            setError("Please select both date and time slot.");
            return;
        }

        const booking = {
            businessId: business_id || "", // Use businessId from route, fallback to empty string
            date: date as Date,
            time: selectedTimeSlot,
            userEmail: user?.email || "",
            userName: user?.name || "",
            status: "Pending", // I would take care of this in backend as pending
        };

        setIsSubmitting(true); // Set submitting state
        try {
            await createBooking(booking);
            enqueueSnackbar("Booking successful", {
                variant: "success",
            });
            handleClose(); // Close dialog on successful booking
            setError("");
        } catch (error) {
            const errorMessage = error as ErrorResponseData;
            console.error(errorMessage);
            setError(errorMessage.response?.data.message ?? "");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setAnimating(true);
        } else {
            const timer = setTimeout(() => {
                setAnimating(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isAnimating && !isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div
                className={`${styles.dialog} ${isAnimating ? styles.slideIn : styles.slideOut}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={handleClose}>
                    &times;
                </button>
                <div className={styles.dialogContent}>
                    <h2 className={styles.titleMain}>Book a Service</h2>
                    <p className={styles.subtitle}>Select Date and Timeslot to book a service</p>
                    <div className={styles.calendarSection}>
                        <h3 className={styles.title}>Select Date</h3>
                        <Calendar
                            onChange={setDate}
                            value={date}
                            minDate={new Date()}
                        />
                    </div>
                    <div className={styles.timeSlotSection}>
                        <h3 className={styles.title}>Select Time Slot</h3>
                        <div className={styles.chipContainer}>
                            {timeSlots.map((slot) => (
                                <SelectableChip
                                    key={slot}
                                    label={slot}
                                    isSelected={selectedTimeSlot === slot}
                                    isCrossed={bookedTimeSlots.includes(slot)}
                                    onClick={() => handleTimeSlotChange(slot)}
                                />
                            ))}
                        </div>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
                <div className={styles.dialogFooter}>
                    <Button onClick={handleConfirmBooking}>
                        {isSubmitting ? "Submitting..." : "Confirm"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookSidebarDialog;
