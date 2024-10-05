"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBooking = exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
// Booking Schema
const bookingSchema = new mongoose_1.default.Schema({
    businessId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
// Joi Validation Schema
const validateBooking = (data) => {
    const schema = joi_1.default.object({
        businessId: joi_1.default.string().hex().length(24).required(),
        date: joi_1.default.date().min('now').required(),
        time: joi_1.default.string().required(),
        userEmail: joi_1.default.string().email().required(),
        userName: joi_1.default.string().min(1).required(),
        status: joi_1.default.string().valid('Pending', 'Confirmed', 'Cancelled').optional(),
    });
    return schema.validate(data);
};
exports.validateBooking = validateBooking;
// Mongoose Pre-save Hook to Validate Data
bookingSchema.pre('save', function (next) {
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
    }
    else {
        next();
    }
});
// Create Booking Model
const Booking = mongoose_1.default.model('Booking', bookingSchema);
exports.Booking = Booking;
