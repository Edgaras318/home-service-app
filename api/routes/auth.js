const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); // Path to your controller

// POST /auth/login
router.post('/login', authController.login);
// POST /auth/register
router.post('/register', authController.register);

module.exports = router;
