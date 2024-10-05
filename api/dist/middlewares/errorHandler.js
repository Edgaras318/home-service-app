"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Error Handler Middleware
const errorHandler = (err, // Use a specific error type if available
req, res, next) => {
    // Check if 'res' is provided and is a valid object
    if (!res || typeof res.status !== 'function') {
        // Handle the case where 'res' is not available (e.g., return a generic message)
        console.error('Response object not available for error handling');
        return next('Route not found or response object unavailable');
    }
    // Send the error response
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};
exports.default = errorHandler; // Use ES6 export
