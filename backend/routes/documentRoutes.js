const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const verifyToken = require('../middleware/authMiddleware');

// Rutas CRUD para documentos
router.post('/upload', verifyToken, documentController.uploadDocument);
router.get('/mydocuments', verifyToken, documentController.getUserDocuments);
router.put('/:documentId', verifyToken, documentController.updateDocumentById);
router.get('/:documentId', verifyToken, documentController.getDocumentById);
router.get('/data/:documentId', verifyToken, documentController.getDocumentData);
router.delete('/:documentId', verifyToken, documentController.deleteDocumentById);
router.get('/searchByName', verifyToken, documentController.searchDocumentsByName);
router.get('/searchByType', verifyToken, documentController.searchDocumentsByType);
router.get('/searchByDate', verifyToken, documentController.searchDocumentsByDate);

// Rutas para documentos compartidos

router.get('/sharedByWithMe/:userId', verifyToken,documentController.getDocumentsSharedWithUser);
router.post('/share',verifyToken, documentController.shareDocument);
router.post('/unshare',verifyToken, documentController.unshareDocument);
module.exports = router;
