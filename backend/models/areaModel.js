const mongoose = require('mongoose');

// Esquema de Área
const areaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true }
  });
  
  // Modelo de Área
const Area = mongoose.model('Area', areaSchema);

module.exports =  Area;