// routes/usersRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/area/:areaId', UserController.getUsersByArea);
router.put('/:id', verifyToken, UserController.updateUser); // Protege la ruta PUT para actualizar un usuario por ID
router.delete('/:id',verifyToken, UserController.deleteUser); // Protege la ruta DELETE para eliminar un usuario por ID

// Aquí podrías agregar más rutas como POST para crear usuarios, PUT para actualizar, DELETE para borrar, etc.

module.exports = router;
