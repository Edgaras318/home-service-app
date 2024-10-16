import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

// Booking Interface
interface IBooking extends Document {
    businessId: mongoose.Schema.Types.ObjectId;
    date: Date;
    time: string;
    userEmail: string;
    userName: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled';
}

// Booking Schema
const bookingSchema = new mongoose.Schema<IBooking>(
    {
        businessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        userEmail: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Cancelled'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    },
);

// Joi Validation Schema
const validateBooking = (data: any) => {
    const schema = Joi.object({
        businessId: Joi.string().hex().length(24).required(),
        date: Joi.date().min('now').required(),
        time: Joi.string().required(),
        userEmail: Joi.string().email().required(),
        userName: Joi.string().min(1).required(),
        status: Joi.string().valid('Pending', 'Confirmed', 'Cancelled').optional(),
    });
    return schema.validate(data);
};

// Mongoose Pre-save Hook to Validate Data
bookingSchema.pre<IBooking>('save', function (next) {
    const { businessId, date, time, userEmail, userName, status } = this;

    const { error } = validateBooking({
        businessId: businessId.toString(),
        date,
        time,
        userEmail,
        userName,
        status,
    });
    if (error) {
        next(new Error(error.details[0].message));
    } else {
        next();
    }
});

// Create Booking Model
const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);
export { Booking, validateBooking };
