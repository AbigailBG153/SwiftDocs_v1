
const Document = require('../models/documentModel');

// Subir documento
exports.uploadDocument = [
  async (req, res) => {
    try {
      const { filename, tipo,size, fileData } = req.body;
      const document = new Document({
        filename,
        tipo,
        size,
        fileData: Buffer.from(fileData, 'base64'),
        uploadedBy: req.userId,
        sharedWith: []
      });
      await document.save();
      res.status(201).send(document);
    } catch (error) {
      res.status(500).send({ message: 'Error uploading document', error });
    }
  }
];


// Obtener documentos del usuario
exports.getUserDocuments = async (req, res) => {
    try {
      // Aquí obtienes los documentos del usuario actual
      const userId = req.userId; // Id del usuario obtenido del token JWT
      const documents = await Document.find({ uploadedBy: userId });
  
      res.status(200).json(documents);
    } catch (error) {
      console.error('Error retrieving user documents', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getDocumentsSharedWithUser = async (req, res) => {

     try {
      // Aquí obtienes los documentos del usuario actual
      const { userId } = req.params;// Id del usuario obtenido del token JWT
      const documents = await Document.find({ sharedWith: userId });
  
      res.status(200).json(documents);
    } catch (error) {
      console.error('Error retrieving user documents', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  // Actualizar documento por ID
exports.updateDocumentById = async (req, res) => {
    try {
      const { documentId } = req.params; // ID del documento a actualizar
      const { filename, tipo, size, fileData } = req.body; // Datos actualizados del documento
  
      // Buscar y actualizar el documento por su ID
      const updatedDocument = await Document.findByIdAndUpdate(documentId, {
        filename,
        tipo,
        size,
        fileData: Buffer.from(fileData, 'base64')
      }, { new: true }); // { new: true } devuelve el documento actualizado en lugar del original
  
      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedDocument);
    } catch (error) {
      console.error('Error updating document', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// buscar documento por ID
exports.getDocumentById = async (req, res) => {
    try {
      const { documentId } = req.params;
      const document = await Document.findById(documentId);
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json(document);
    } catch (error) {
      console.error('Error retrieving document by ID', error);
      res.status(500).json({ message: 'Error retrieving document by ID', error });
    }
};

  exports.deleteDocumentById = async (req, res) => {
    try {
      const { documentId } = req.params; // ID del documento a eliminar
  
      // Buscar y eliminar el documento por su ID
      const deletedDocument = await Document.findByIdAndDelete(documentId);
  
      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
      console.error('Error deleting document', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Buscar documentos por nombre
exports.searchDocumentsByName = async (req, res) => {
    try {
      const { name } = req.query; // Nombre del documento a buscar
  
      // Buscar documentos que contengan el nombre proporcionado
      const documents = await Document.find({ filename: { $regex: name, $options: 'i' } });
  
      res.status(200).json(documents);
    } catch (error) {
      console.error('Error searching documents by name', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Buscar documentos por tipo
  exports.searchDocumentsByType = async (req, res) => {
    try {
      const { type } = req.query; // Tipo de documento a buscar
  
      // Buscar documentos por tipo exacto
      const documents = await Document.find({ tipo });
  
      res.status(200).json(documents);
    } catch (error) {
      console.error('Error searching documents by type', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Buscar documentos por fecha (ejemplo)
  exports.searchDocumentsByDate = async (req, res) => {
    try {
      const { date } = req.query; // Fecha del documento a buscar
  
      // Ejemplo: buscar documentos cargados después de la fecha proporcionada
      const documents = await Document.find({ uploadedAt: { $gte: new Date(date) } });
  
      res.status(200).json(documents);
    } catch (error) {
      console.error('Error searching documents by date', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Obtener documento por ID
exports.getDocumentData = async (req, res) => {
    try {
      const { documentId } = req.params;
      const document = await Document.findById(documentId);
  
      if (!document) {
        return res.status(404).send({ message: 'Documento no encontrado' });
      }
  
      // Convertir Buffer a Base64
      const base64Data = document.fileData.toString('base64');
      const mimeType = document.tipo;
  
      // Crear objeto de respuesta con datos Base64 y tipo MIME
      const response = {
        base64Data,
        mimeType
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error al obtener documento', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };



exports.getDocumentsSharedByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const documents = await Document.find({ uploadedBy: userId, sharedWith: { $ne: [] } }).populate('sharedWith', 'username');
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Obtener documentos compartidos con el usuario
// Compartir un documento con otro usuario
exports.shareDocument = async (req, res) => {
  try {
    const { documentId, userIdToShareWith } = req.body;
    
    // Validar y actualizar el documento
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Asegurarse de que el documento no se comparta con el mismo usuario más de una vez
    if (document.sharedWith.includes(userIdToShareWith)) {
      return res.status(400).json({ message: 'Document already shared with this user' });
    }

    document.sharedWith.push(userIdToShareWith);
    await document.save();

    res.status(200).json({ message: 'Document shared successfully', document });
  } catch (error) {
    res.status(500).json({ message: 'Error sharing document', error: error.message });
  }
};

// Dejar de compartir un documento con un usuario
exports.unshareDocument = async (req, res) => {
  try {
    const { documentId, userIdToRemove } = req.body;

    // Validar y actualizar el documento
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Remover al usuario de la lista de compartidos
    document.sharedWith = document.sharedWith.filter(user => user.toString() !== userIdToRemove);
    await document.save();

    res.status(200).json({ message: 'Access removed successfully', document });
  } catch (error) {
    res.status(500).json({ message: 'Error removing access', error: error.message });
  }
};
