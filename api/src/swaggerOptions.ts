import { Options } from 'swagger-jsdoc'; // Importing SwaggerOptions for typing

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Business Booking API',
      version: '1.0.0',
      description: 'API documentation for managing businesses, categories, and bookings',
    },
    servers: [
      {
        url: 'http://localhost:5001/api',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.ts'], // Ensure the file path matches the TypeScript file extension
};

export default swaggerOptions; // Export the options using ES module syntax
