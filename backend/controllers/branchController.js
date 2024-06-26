const Branch = require('../models/brachModel');

// Obtener todas las sucursales
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    res.status(500).json({ error: 'Error al obtener sucursales', message: error.message });
  }
};

// Obtener una sucursal por ID
exports.getBranchById = async (req, res) => {
  const { id } = req.params;
  try {
    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.status(200).json(branch);
  } catch (error) {
    console.error('Error al obtener la sucursal por ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva sucursal
exports.createBranch = async (req, res) => {
  const { name } = req.body;
  try {
    const newBranch = new Branch({ name });
    await newBranch.save();
    res.status(201).json(newBranch);
  } catch (error) {
    console.error('Error al crear una nueva sucursal:', error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una sucursal por ID
exports.updateBranch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const branch = await Branch.findByIdAndUpdate(id, { name }, { new: true });
    if (!branch) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.status(200).json(branch);
  } catch (error) {
    console.error('Error al actualizar la sucursal por ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una sucursal por ID
exports.deleteBranch = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBranch = await Branch.findByIdAndDelete(id);
    if (!deletedBranch) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.status(200).json(deletedBranch);
  } catch (error) {
    console.error('Error al eliminar la sucursal por ID:', error);
    res.status(500).json({ message: error.message });
  }
};
