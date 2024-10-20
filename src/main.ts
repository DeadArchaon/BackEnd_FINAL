import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { logger } from "./middlewares/authMiddleware.js";
import moviesRouter from './routers/moviesRouter.js';
import usersRouter from './routers/usersRouter.js';
import commentsRouter from './routers/commentsRouter.js';

dotenv.config();

const app: Express = express();

app.use(fileUpload());
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(logger);
app.use('/api', usersRouter);
app.use('/api', moviesRouter);
app.use('/api', commentsRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

const PORT = process.env.PORT || 6969;

const startApp = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'prod') {
        console.log(`Server is running in production mode on port ${PORT}`);
      } else {
        console.log(`Server is running in development mode on port ${PORT}`);
      }
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error connecting to database", err);
    }
  }
};

startApp();