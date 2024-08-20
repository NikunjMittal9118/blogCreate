import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to the MongoDB Database");
    } catch (err) {
        console.error(`Error connecting to MongoDB database: ${err}`);
        throw err;
    }
};

