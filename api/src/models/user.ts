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
        name: Joi.string().min(3).required(),
        age: Joi.number().positive().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(data);
};

// Mongoose Pre-save Hook to Validate Data
userSchema.pre<IUser>('save', async function (next) {
    const { name, age, email, password } = this;

    // Validate user data
    const { error } = validateUser({
        name,
        age,
        email,
        password,
    });

    if (error) {
        console.log(error); // eslint-disable-line no-console
        return next(new Error(error.details[0].message)); // Return early on error
    }

    // Hash password only if it's modified
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next(); // Proceed to the next middleware
});

// Compare entered password with hashed password
userSchema.methods.isCorrectPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model and validation function
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
