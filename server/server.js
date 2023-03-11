import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

/* CONFIGURATIONS  */
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* ROUTES */

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;

try {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database is connected...');
  
  app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`);
  });
} catch (error) {
  console.log('Database not connected...')
}