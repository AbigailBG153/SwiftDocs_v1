// Ejemplo de cómo podría ser un modelo de Mongoose para una sucursal (Branch)
const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Otros campos según tu necesidad
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
