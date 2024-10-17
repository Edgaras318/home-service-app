// src/utils/responseUtil.ts
import { Response } from 'express';

// Define a type for your response data
interface ResponseData<T> {
    success: boolean;
    data?: T;
    message?: string;
}

// Utility function to format responses
export const sendResponse = <T>(res: Response, data?: T, message?: string, statusCode = 200): Response => {
    const responseData: ResponseData<T> = {
        success: statusCode < 400, // success if status code is less than 400
        data,
        message,
    };
    return res.status(statusCode).json(responseData);
};
