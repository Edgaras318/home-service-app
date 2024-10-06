// Define the User type
export type User = {
    _id: string;
    name: string;
    email: string;
    age: string;
}

// Define the AuthResponse type
export type AuthResponse = {
    status: string;
    token: string;
    user: User;
}

// Define the LoginPayload type
export type LoginPayload = {
    email: string;
    password: string;
}

// Use intersection (&) to extend LoginPayload for RegisterPayload
export type RegisterPayload = LoginPayload & {
    name: string;
    age: string;
}

export type AuthErrors = {
    name?: string;
    age?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}
