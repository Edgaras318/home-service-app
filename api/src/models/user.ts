import mongoose, { Document, Model, Types } from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

// Define an interface for the User document
interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    age: number;
    email: string;
    password: string;
    isCorrectPassword(enteredPassword: string): Promise<boolean>;
}

// User Schema
const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

// Joi Validation Schema
const validateUser = (data: { name: string; age: number; email: string; password: string; }) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        age: Joi.number().min(0).required(), // Assuming age should be a non-negative number
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

// Hash password before saving the user
userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare entered password with hashed password
userSchema.methods.isCorrectPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model and validation function
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User
