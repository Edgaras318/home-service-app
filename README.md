# Home Service Application

## Overview

The Home Service Application is a full-stack web application built using Node.js for the backend and React for the frontend. This application allows users to manage home service requests efficiently, providing a seamless user experience with real-time interactions.

## Project Structure

This project consists of two main parts:

1. **Backend**: A Node.js/Express server that handles API requests.
2. **Frontend**: A React application built with Vite for a fast development experience.

## Backend

### Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- Swagger for API documentation

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Edgaras318/home-service-ts.git
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables: Create a .env file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.i1xgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=5001
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Available Scripts
- npm run build: Compiles TypeScript files into JavaScript.
- npm run start: Starts the production server.
- npm run dev: Runs the server in development mode with automatic restarts.
- npm run lint: Lints the code using ESLint.
- npm run prettier: Formats the code using Prettier.
- npm run deploy: Builds the project and deploys it to Vercel.

## Frontend

### Technologies Used
- React
- Vite
- Axios for API requests
- React Router for navigation
- Formik and Yup for form handling and validation
- Zustand for state management

### Getting Started

1. avigate to the `client` folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables: Create a .env file in the root directory and add the following:
   ```env
   VITE_SERVER_URL=https://home-service-api-ts.vercel.app/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Available Scripts
- npm run build: Builds the application for production.
- npm run dev: Starts the Vite development server.
- npm run lint: Lints the code using ESLint.
- npm run preview: Previews the production build locally.
- npm run test: Runs tests using Jest.
- npm run coverage: Generates a coverage report for tests.
- npm run deploy: Builds the project and deploys it to Vercel.

## API Documentation

The backend API is documented using Swagger. You can access the documentation at http://localhost:5001/api-docs after starting the server.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Node.js and Express for server-side development.
- React and Vite for a modern frontend experience.
- MongoDB for data storage.
