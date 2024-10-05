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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
exports.PORT = PORT;
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = process.env.MONGO_URI;
        // Check if MONGO_URI is defined
        if (!url) {
            console.error('MONGO_URI is not defined in the environment variables.');
            process.exit(1);
        }
        yield mongoose_1.default.connect(url);
        console.log('Connected to MongoDB with Mongoose'); // eslint-disable-line no-console
    }
    catch (err) {
        console.error('Could not connect to the database', err); // eslint-disable-line no-console
        process.exit(1);
    }
});
exports.connectToDb = connectToDb;
