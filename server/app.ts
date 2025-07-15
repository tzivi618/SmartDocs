//app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import documentRoutes from './routes/documentRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { logRequests } from './middlewares/logRequests';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(logRequests);
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use(errorHandler);

export default app;