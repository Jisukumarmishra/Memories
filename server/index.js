import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";

import postRoutes from './routes/posts.js';
dotenv.config();

const app = express();

// 1. CORS aur BodyParser ko HAMESHA Routes se pehle likhna chahiye!
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// 2. Ab routes ko yahan likhein
app.use('/posts', postRoutes);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDb Connections Failed", error.message);
  });