const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToDb, PORT } = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

const categoriesRoutes = require('./routes/categories');
const businessesRoutes = require('./routes/businesses');
const bookingsRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');

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

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err); // eslint-disable-line no-console
  });
