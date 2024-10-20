import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 6969;
const app = express();
app.use(express.json());
console.log(process.env.NODE_ENV);
const startApp = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error connecting to database', err);
    }
  }
};
startApp();