"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const tokenUtils_1 = require("../utils/tokenUtils");
// POST /auth/login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate request body
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password." });
    }
    try {
        // Check if the user exists
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Verify the password using instance method
        const isMatch = yield user.isCorrectPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = (0, tokenUtils_1.generateToken)(user._id);
        // Send the token as response
        return res.json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.login = login;
// POST /auth/register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, email, password } = req.body;
    // Validate request body
    if (!name || !email || !password || !age) {
        return res.status(400).json({ message: 'Please provide all required fields (name, age, email, password).' });
    }
    try {
        // Check if user already exists
        let user = yield user_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create a new user instance
        user = new user_1.default({ name, age, email, password });
        // Save the new user
        yield user.save();
        // Generate JWT token
        const token = (0, tokenUtils_1.generateToken)(user._id);
        // Send the token as response
        return res.status(201).json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.register = register;
