import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import weightRoutes from './routes/weightRoute.js'

dotenv.config();
const app = express();

const corsOptionsDelegate = (req, callback) => {
  const allowedOrigins = ['http://localhost:5173', 'https://acme-health.vercel.app'];
  const corsOptions = {
    origin: allowedOrigins.includes(req.header('Origin')),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate)); 


app.use(express.json());

mongoose.connect(process.env.LOCAL_MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/weight',weightRoutes );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
