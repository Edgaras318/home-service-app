// Define the User type
export type User = {
    _id: string;
    name: string;
    email: string;
    age: string;
}


export interface AuthData {
    token: string;         // JWT token
    user: User;           // User information
}

export interface AuthResponse {
    success: boolean;      // Indicates success or failure of the login
    message: string;       // Message related to the response
    data: AuthData;       // Contains token and user information
}
// Define the LoginPayload type
export type LoginPayload = {
    email: string;
    password: string;
}

// Use intersection (&) to extend LoginPayload for RegisterPayload
export type RegisterPayload = LoginPayload & {
    name: string;
    age: number;
}

export type FormDataRegister = {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
};
