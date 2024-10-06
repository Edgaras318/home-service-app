// validators.ts

// Function to validate a username
export const validateName = (name: string): string => {
    if (name.length < 3) return "Name must be at least 3 characters.";
    if (name.length > 20) return "Name must be no more than 20 characters.";
    if (!/^[a-zA-Z0-9_]+$/.test(name)) return "Name can only contain letters, numbers, and underscores.";
    return ""; // No error
};

// Function to validate a password
export const validatePassword = (password: string): string => {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character.";
    return ""; // No error
};

// Function to validate an email address
export const validateEmail = (email: string): string => {
    // Basic email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return ""; // No error
};
