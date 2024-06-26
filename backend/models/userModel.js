// En el archivo user.js
const mongoose = require('mongoose');

// Esquema de Usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  telefono: { type: String },
  cargo: { type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rol' }],
  fecha_creacion: { type: Date, default: Date.now },
  fecha_finalizacion: { type: Date },
  fecha_modificacion:{ type: Date, default: Date.now },
  ultimo_acceso: { type: Date },
  estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  foto: { data: Buffer, contentType: String }
});

// Modelo de Usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
