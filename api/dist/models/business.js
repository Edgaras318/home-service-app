"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBusiness = exports.Business = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
// Business Schema
const businessSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    contactPerson: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photos: [String],
}, {
    timestamps: true,
});
// Joi Validation Schema
const validateBusiness = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(1).required(),
        description: joi_1.default.string().allow(''),
        address: joi_1.default.string().allow(''),
        category: joi_1.default.string().hex().length(24).required(),
        contactPerson: joi_1.default.string().min(1).required(),
        email: joi_1.default.string().email().required(),
        photos: joi_1.default.array().items(joi_1.default.string().uri()),
    });
    return schema.validate(data);
};
exports.validateBusiness = validateBusiness;
// Mongoose Pre-save Hook to Validate Data
businessSchema.pre('save', function (next) {
    const { name, description, address, category, contactPerson, email, photos } = this;
    const { error } = validateBusiness({
        name,
        description,
        address,
        category: category.toString(),
        contactPerson,
        email,
        photos,
    });
    if (error) {
        console.log(error); // eslint-disable-line no-console
        next(new Error(error.details[0].message));
    }
    else {
        next();
    }
});
// Create Business Model
const Business = mongoose_1.default.model('Business', businessSchema);
exports.Business = Business;
