# Home Service API

A RESTful API for managing home service bookings, businesses, and categories. This API allows users to create, read, update, and delete bookings and businesses.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [Bookings](#bookings)
  - [Businesses](#businesses)
  - [Categories](#categories)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete bookings and businesses.
- Manage categories for businesses.
- Input validation and error handling.
- CORS support for cross-origin requests.

## Technologies Used

- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- MongoDB Atlas (for database management)
- dotenv (for environment variable management)
- Body-parser (for parsing request bodies)
- CORS (for cross-origin resource sharing)

## API Endpoints

### Bookings

- **POST** `/api/bookings`: Create a new booking

  - **Request Body**:
    ```json
    {
      "date": "2024-09-30T00:00:00.000Z",
      "time": "14:00",
      "userEmail": "user@example.com",
      "userName": "John Doe"
    }
    ```

- **GET** `/api/bookings`: Retrieve all bookings

- **GET** `/api/bookings/:id`: Retrieve a specific booking by ID

- **PUT** `/api/bookings/:id`: Update an existing booking

  - **Request Body**:
    ```json
    {
      "date": "2024-09-30T00:00:00.000Z",
      "time": "15:00",
      "userEmail": "user@example.com",
      "userName": "John Doe",
      "status": "Confirmed"
    }
    ```

- **DELETE** `/api/bookings/:id`: Delete a booking by ID

### Businesses

- **POST** `/api/businesses`: Create a new business

  - **Request Body**:
    ```json
    {
      "name": "Business Name",
      "description": "A brief description of the business.",
      "address": "123 Main St, City, Country",
      "category": "categoryId",
      "contactPerson": "Jane Doe",
      "email": "contact@example.com",
      "photos": ["photo1.jpg", "photo2.jpg"]
    }
    ```

- **GET** `/api/businesses`: Retrieve all businesses

- **GET** `/api/businesses/:id`: Retrieve a specific business by ID

- **PUT** `/api/businesses/:id`: Update an existing business

  - **Request Body**: Similar to the POST request.

- **DELETE** `/api/businesses/:id`: Delete a business by ID

### Categories

- **POST** `/api/categories`: Create a new category

  - **Request Body**:
    ```json
    {
      "name": "Category Name"
    }
    ```

- **GET** `/api/categories`: Retrieve all categories

- **GET** `/api/categories/:id`: Retrieve a specific category by ID

- **PUT** `/api/categories/:id`: Update an existing category

- **DELETE** `/api/categories/:id`: Delete a category by ID

## Swagger API Documentation

This API is documented using **Swagger**, providing a user-friendly interface to explore and test the API endpoints interactively.

### Accessing the Swagger Documentation

To access the Swagger API documentation, start your server and navigate to the following URL in your web browser:
http://localhost:5000/api-docs

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/home-service-api.git
   cd home-service-api

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Set up environment variables:

   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
   PORT=5000

   ```

4. Start the server:
   ```bash
   npm run start
   ```

## Usage

You can use tools like Postman or cURL to interact with the API. Make sure to include the appropriate HTTP methods and request bodies as specified in the API Endpoints section.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.
