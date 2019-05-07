import 'dotenv/config';
import mongoose from 'mongoose';

// models
import User from './user';

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useCreateIndex: true });
};

const models = { User };

export { connectDb };

export default models;