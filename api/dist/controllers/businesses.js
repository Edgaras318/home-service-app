"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsByBusinessAndDate = exports.updateBusiness = exports.createBusiness = exports.getBusinessById = exports.getBusinessesByCategory = exports.getAllBusinesses = void 0;
const business_1 = require("../models/business");
const booking_1 = require("../models/booking");
// GET /businesses
const getAllBusinesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const businesses = yield business_1.Business.find().populate('category');
        return res.status(200).json(businesses);
    }
    catch (err) {
        return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
    }
});
exports.getAllBusinesses = getAllBusinesses;
// GET /businesses/category/:category
const getBusinessesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    try {
        const businesses = yield business_1.Business.find({ category }).populate('category');
        return res.status(200).json(businesses);
    }
    catch (err) {
        return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
    }
});
exports.getBusinessesByCategory = getBusinessesByCategory;
// GET /businesses/:id
const getBusinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const business = yield business_1.Business.findById(req.params.id).populate('category');
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        return res.status(200).json(business);
    }
    catch (err) {
        return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
    }
});
exports.getBusinessById = getBusinessById;
// POST /businesses
const createBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const business = new business_1.Business(req.body);
    try {
        const savedBusiness = yield business.save();
        return res.status(201).json(savedBusiness);
    }
    catch (err) {
        return res.status(400).json({ message: err instanceof Error ? err.message : 'Bad Request' });
    }
});
exports.createBusiness = createBusiness;
// PUT /businesses/:id
const updateBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const business = yield business_1.Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        // Update the business properties
        Object.assign(business, req.body);
        const updatedBusiness = yield business.save();
        return res.status(200).json(updatedBusiness);
    }
    catch (err) {
        return res.status(400).json({ message: err instanceof Error ? err.message : 'Bad Request' });
    }
});
exports.updateBusiness = updateBusiness;
// GET /businesses/:businessId/bookings/date/:date
const getBookingsByBusinessAndDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessId, date } = req.params;
    try {
        const bookings = yield booking_1.Booking.find({ businessId, date });
        return res.status(200).json(bookings);
    }
    catch (err) {
        return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
    }
});
exports.getBookingsByBusinessAndDate = getBookingsByBusinessAndDate;
