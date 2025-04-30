import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import weightRoutes from './routes/weightRoute.js'

dotenv.config();
const app = express();


const corsOptions = {
  origin: ['http://localhost:5173/api','https://acme-health.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.LOCAL_MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/weight',weightRoutes );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
