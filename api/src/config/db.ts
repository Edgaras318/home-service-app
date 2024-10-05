import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT ?? 5000;

const connectToDb = async () => {
  try {
    const url = process.env.MONGO_URI;

    // Check if MONGO_URI is defined
    if (!url) {
      console.error('MONGO_URI is not defined in the environment variables.');
      process.exit(1);
    }

    await mongoose.connect(url);
    console.log('Connected to MongoDB with Mongoose'); // eslint-disable-line no-console
  } catch (err) {
    console.error('Could not connect to the database', err); // eslint-disable-line no-console
    process.exit(1);
  }
};

// Use ES module export syntax
export { connectToDb, PORT };
