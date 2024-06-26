// controllers/rolController.js
const Rol = require('../models/rolModel');

// Crear un nuevo rol
exports.createRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const newRol = new Rol({ nombre, descripcion });
    await newRol.save();
    res.status(201).json(newRol);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un rol por su ID
exports.getRolById = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (!rol) {
      return res.status(404).json({ msg: 'Rol not found' });
    }
    res.json(rol);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un rol por su ID
exports.updateRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const rol = await Rol.findById(req.params.id);
    if (!rol) {
      return res.status(404).json({ msg: 'Rol not found' });
    }

    rol.nombre = nombre || rol.nombre;
    rol.descripcion = descripcion || rol.descripcion;
    rol.fecha_actualizacion = new Date();

    await rol.save();
    res.json({ msg: 'Rol updated', rol });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un rol por su ID
exports.deleteRol = async (req, res) => {
  try {
    const rol = await Rol.findByIdAndDelete(req.params.id);
    if (!rol) {
      return res.status(404).json({ msg: 'Rol not found' });
    }
    res.json({ msg: 'Rol deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar roles por nombre
exports.getRolesByName = async (req, res) => {
    try {
      const { nombre } = req.query;
  
      // Construir la consulta para buscar por nombre (ignorando mayúsculas/minúsculas)
      const regex = new RegExp(nombre, 'i');
      const roles = await Rol.find({ nombre: regex });
  
      res.json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
