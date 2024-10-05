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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getAllCategories = void 0;
const category_1 = require("../models/category");
// GET /categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.find();
        return res.status(200).json(categories); // Explicitly return the response
    }
    catch (err) {
        return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
    }
});
exports.getAllCategories = getAllCategories;
// POST /categories
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, backgroundColor, iconUrl } = req.body;
    // Optionally, you can add validation here for the request body
    if (!name || !backgroundColor || !iconUrl) {
        return res.status(400).json({ message: 'All fields are required.' }); // Explicitly return the response
    }
    const category = new category_1.Category({ name, backgroundColor, iconUrl });
    try {
        const savedCategory = yield category.save();
        return res.status(201).json(savedCategory); // Explicitly return the response
    }
    catch (err) {
        return res.status(400).json({ message: err instanceof Error ? err.message : 'Bad Request' });
    }
});
exports.createCategory = createCategory;
