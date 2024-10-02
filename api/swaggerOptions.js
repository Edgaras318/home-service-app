const swaggerOptions = {
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
  apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;
