// routes/rolRoutes.js
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/',verifyToken , rolController.createRol);
router.get('/',verifyToken , rolController.getAllRoles);
router.get('/:id', verifyToken ,rolController.getRolById);
router.get('/:nombre', verifyToken ,rolController.getRolesByName);
router.put('/:id',verifyToken , rolController.updateRol);
router.delete('/:id', verifyToken ,rolController.deleteRol);

module.exports = router;
