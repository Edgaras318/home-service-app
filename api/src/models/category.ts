import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

// Define an interface for the Category document
interface ICategory extends Document {
    name: string;
    backgroundColor?: string;
    iconUrl?: string;
}

// Define an interface for the category validation input
interface ICategoryInput {
    name: string;
    backgroundColor?: string;
    iconUrl?: string;
}

// Category Schema
const categorySchema = new mongoose.Schema<ICategory>(
    {
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
    },
    {
        timestamps: true,
    },
);

// Joi Validation Schema
const validateCategory = (data: ICategoryInput) => {
    const schema = Joi.object<ICategoryInput>({
        name: Joi.string().min(3).required(),
        backgroundColor: Joi.string()
            .pattern(/^#[0-9A-F]{6}$/i)
            .optional(),
        iconUrl: Joi.string().uri().optional(),
    });
    return schema.validate(data);
};

// Mongoose Pre-save Hook to Validate Data
categorySchema.pre<ICategory>('save', function (next) {
    // Only extract the necessary fields for validation
    const { name, backgroundColor, iconUrl } = this;

    // Use ICategoryInput for validation
    const { error } = validateCategory({ name, backgroundColor, iconUrl });
    if (error) {
        next(new Error(error.details[0].message));
    } else {
        next();
    }
});

// Export the model
const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);

export { Category };
