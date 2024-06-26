// En el archivo areaRoutes.js
const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
const branchController = require('../controllers/branchController');
const verifyToken = require('../middleware/authMiddleware');

// Rutas para CRUD de Área
router.get('/areas', verifyToken, areaController.getAreas);
router.get('/areas/:id', verifyToken, areaController.getAreaById);
router.post('/areas', verifyToken, areaController.createArea);
router.put('/areas/:id', verifyToken, areaController.updateArea);
router.delete('/areas/:id', verifyToken, areaController.deleteArea);
router.get('/branch/:branchId', verifyToken, areaController.getAreasByBranch);
// Rutas para CRUD de Sucursal
router.get('/branches', verifyToken, branchController.getBranches);
router.get('/branches/:id', verifyToken, branchController.getBranchById);
router.post('/branches', verifyToken, branchController.createBranch);
router.put('/branches/:id', verifyToken, branchController.updateBranch);
router.delete('/branches/:id', verifyToken, branchController.deleteBranch);

module.exports = router;
