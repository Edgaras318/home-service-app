import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

// Business Interface
interface IBusiness extends Document {
    name: string;
    description: string;
    address: string;
    category: mongoose.Schema.Types.ObjectId;
    contactPerson: string;
    email: string;
    photos: string[];
}

// Business Schema
const businessSchema = new mongoose.Schema<IBusiness>(
    {
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
            type: mongoose.Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
    },
);

// Joi Validation Schema
const validateBusiness = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        description: Joi.string().allow(''),
        address: Joi.string().allow(''),
        category: Joi.string().hex().length(24).required(),
        contactPerson: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        photos: Joi.array().items(Joi.string().uri()),
    });
    return schema.validate(data);
};

// Mongoose Pre-save Hook to Validate Data
businessSchema.pre<IBusiness>('save', function (next) {
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
    } else {
        next();
    }
});

// Create Business Model
const Business: Model<IBusiness> = mongoose.model<IBusiness>('Business', businessSchema);
export { Business };
