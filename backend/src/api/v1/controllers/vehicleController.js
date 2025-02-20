import vehicleService from '../services/vehicleService.js';

export const getAllVehicles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sortBy = req.query.sortBy || 'created_at';
    const order = req.query.order === 'desc' ? -1 : 1;

    const options = {
      page,
      limit,
      sort: { [sortBy]: order }
    };

    const filters = {};
    if (req.query.make) {
      filters.make = req.query.make;
    }
    if (req.query.model) {
      filters.model = req.query.model;
    }
    if (req.query.year) {
      filters.year = req.query.year;
    }
    if (req.query.status) {
      filters.status = req.query.status;
    }

    const vehicles = await vehicleService.getAllVehicles(options, filters);
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    const vehicleData = {
      ...req.body,
      created_by: req.user._id,
      updated_by: req.user._id
    };
    const vehicle = await vehicleService.createVehicle(vehicleData);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicleData = {
      ...req.body,
      updated_by: req.user._id
    };
    const vehicle = await vehicleService.updateVehicle(req.params.id, vehicleData);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
