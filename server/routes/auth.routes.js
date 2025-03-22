// server/routes/auth.routes.js

const express = require('express');
const router = express.Router();

// Importa las funciones de registro y login del controlador
const { registerUser, loginUser } = require('../controllers/auth.controller');

// POST /auth/register -> registra un nuevo usuario
router.post('/register', registerUser);

// POST /auth/login -> inicia sesión
router.post('/login', loginUser);

module.exports = router;
