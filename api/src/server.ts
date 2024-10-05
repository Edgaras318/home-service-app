import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDb, PORT } from './config/db';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerOptions'; // Adjust the import path
import fs from 'fs';
import path from 'path';

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

// Define the path to your swagger.json file
const swaggerFilePath = path.join(__dirname, 'swagger.json');

// Read the JSON file and set up Swagger documentation
let swaggerDocument: object;
try {
    const swaggerData = fs.readFileSync(swaggerFilePath, 'utf-8');
    swaggerDocument = JSON.parse(swaggerData);
} catch (error) {
    console.error("Error reading swagger.json:", error);
    swaggerDocument = {}; // Set to empty object to avoid crashing if file read fails
}

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
