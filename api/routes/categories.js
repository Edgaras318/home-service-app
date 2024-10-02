const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/', categoriesController.getAllCategories);
router.post('/', authMiddleware, categoriesController.createCategory);

module.exports = router;
