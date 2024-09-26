const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registro de usuario
router.post('/registro', authController.registro);

// Ruta para inicio de sesión
router.post('/iniciar-sesion', authController.iniciarSesion);

module.exports = router;
