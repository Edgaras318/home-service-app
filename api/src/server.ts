import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDb, PORT } from './config/db';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import categoriesRoutes from './routes/categories';
import businessesRoutes from './routes/businesses';
import bookingsRoutes from './routes/bookings';
import authRoutes from './routes/auth';
import errorHandler from './middlewares/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger documentation setup
const swaggerFile = fs.readFileSync('./swagger.json', 'utf8'); // Read the JSON file
const swaggerDocs = JSON.parse(swaggerFile); // Parse the JSON content
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
