import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDb, PORT } from './config/db';
import { setupSwagger } from './middlewares/swagger'; // Adjust the path as necessary
import path from "path";

import categoriesRoutes from './routes/categories';
import businessesRoutes from './routes/businesses';
import bookingsRoutes from './routes/bookings';
import authRoutes from './routes/auth';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.static(path.join(__dirname, "../", "public")));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Swagger documentation
setupSwagger(app);

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/businesses', businessesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
connectToDb()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to the database', err);
    });
