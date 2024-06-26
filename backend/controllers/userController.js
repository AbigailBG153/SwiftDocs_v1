// controllers/userController.js

const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUsersByArea = async (req, res) => {
  const { areaId } = req.params;
  try {
    const users = await User.find({ area: areaId }).populate('area').populate('branch');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios por área:', error);
    res.status(500).json({ error: 'Error al obtener usuarios por área' });
  }
};

exports.updateUser = async (req, res) => {
  const { username, email, telefono, cargo, sucursal_id, area_id, roles_id ,fecha_finalizacion,password} = req.body;

  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ msg: 'User not found' });
      }

      user.username = username || user.username;
      user.email = email || user.email ;
      user.password = password || user.password;
      user.telefono = telefono || user.telefono ;
      user.cargo = cargo || user.cargo ;
      user.fecha_modificacion = new Date();
      user.fecha_finalizacion = fecha_finalizacion || user.fecha_finalizacion;
      user.sucursal = sucursal_id || user.sucursal  ;
      user.area= area_id ||  user.area ;
      user.roles  = roles_id ||  user.roles;

      await user.save();
      res.json({ msg: 'User updated', user });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).json({ msg: 'User not found' });
      }
      res.json({ msg: 'User deleted' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Implementa más funciones según sea necesario para crear, actualizar y eliminar usuarios
