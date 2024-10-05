"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
// Category Schema
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    backgroundColor: {
        type: String,
        default: '#FFFFFF',
    },
    iconUrl: {
        type: String,
        default: 'http://example.com/default-icon.png',
    },
}, {
    timestamps: true,
});
// Joi Validation Schema
const validateCategory = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
        backgroundColor: joi_1.default.string()
            .pattern(/^#[0-9A-F]{6}$/i)
            .optional(),
        iconUrl: joi_1.default.string().uri().optional(),
    });
    return schema.validate(data);
};
// Mongoose Pre-save Hook to Validate Data
categorySchema.pre('save', function (next) {
    // Only extract the necessary fields for validation
    const { name, backgroundColor, iconUrl } = this;
    // Use ICategoryInput for validation
    const { error } = validateCategory({ name, backgroundColor, iconUrl });
    if (error) {
        next(new Error(error.details[0].message));
    }
    else {
        next();
    }
});
// Export the model
const Category = mongoose_1.default.model('Category', categorySchema);
exports.Category = Category;
