import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerFilePath = path.join(__dirname, '../swagger.json');

let swaggerDocument: object;

try {
    const swaggerData = fs.readFileSync(swaggerFilePath, 'utf-8');
    swaggerDocument = JSON.parse(swaggerData);
} catch (error) {
    console.error("Error reading swagger.json:", error);
    swaggerDocument = {}; // Set to empty object to avoid crashing if file read fails
}

// Define a setup function for Swagger
export const setupSwagger = (app: Express) => { // Use Express type here
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
