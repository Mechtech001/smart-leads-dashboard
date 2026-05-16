import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
  try {
    let conn = await mongoose.connect(env.MONGODB_URI);
    console.log('db connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
