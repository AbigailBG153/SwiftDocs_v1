const Area = require('../models/areaModel');

// Obtener todas las áreas
exports.getAreas = async (req, res) => {
  try {
    const areas = await Area.find().populate('branch');
    res.status(200).json(areas);
  } catch (error) {
    console.error('Error al obtener áreas:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener un área por ID
exports.getAreaById = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await Area.findById(id).populate('branch');
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json(area);
  } catch (error) {
    console.error('Error al obtener el área por ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva área
exports.createArea = async (req, res) => {
  const { name, branch } = req.body;
  try {
    const newArea = new Area({ name, branch });
    await newArea.save();
    res.status(201).json(newArea);
  } catch (error) {
    console.error('Error al crear una nueva área:', error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un área por ID
exports.updateArea = async (req, res) => {
  const { id } = req.params;
  const { name, branch } = req.body;
  try {
    const area = await Area.findByIdAndUpdate(id, { name, branch }, { new: true }).populate('branch');
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json(area);
  } catch (error) {
    console.error('Error al actualizar el área por ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un área por ID
exports.deleteArea = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArea = await Area.findByIdAndDelete(id);
    if (!deletedArea) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json(deletedArea);
  } catch (error) {
    console.error('Error al eliminar el área por ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener áreas por sucursal
exports.getAreasByBranch = async (req, res) => {
  const { branchId } = req.params;
  try {
    const areas = await Area.find({ branch: branchId }).populate('branch');
    res.status(200).json(areas);
  } catch (error) {
    console.error('Error al obtener áreas por sucursal:', error);
    res.status(500).json({ error: 'Error al obtener áreas por sucursal' });
  }
};
