//app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import documentRoutes from './routes/documentRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { logRequests } from './middlewares/logRequests';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequests);
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use(errorHandler);

export default app;