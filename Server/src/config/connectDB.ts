import mongoose from 'mongoose';
import config from './config';

const mongoURI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@cluster0.4qgkjzt.mongodb.net/techInsightsDB`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ MongoDB connection failed:', err.message);
    } else {
      console.error('❌ MongoDB connection failed:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
