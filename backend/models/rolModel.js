const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  descripcion: { type: String }
});

// Middleware para actualizar la fecha de actualización antes de guardar
RolSchema.pre('save', function(next) {
  this.fecha_actualizacion = new Date();
  next();
});

module.exports = mongoose.model('Rol', RolSchema);
