import Vehicle from '../models/Vehicle.js';

const getAllVehicles = async (options, filters) => {
  const { page, limit, sort } = options;
  const totalVehicles = await Vehicle.countDocuments(filters);
  const vehicles = await Vehicle.find(filters)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
  const totalPages = Math.ceil(totalVehicles / limit);
  return { vehicles, totalPages };
};

const getVehicleById = async (id) => {
  return await Vehicle.findById(id);
};

const createVehicle = async (vehicleData) => {
  const vehicle = new Vehicle(vehicleData);
  await vehicle.save();
  return vehicle;
};

const updateVehicle = async (id, vehicleData) => {
  vehicleData.updated_at = Date.now();
  return await Vehicle.findByIdAndUpdate(id, vehicleData, { new: true });
};

const deleteVehicle = async (id) => {
  await Vehicle.findByIdAndDelete(id);
  return { message: 'Vehicle deleted successfully' };
};

const vehicleService = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
};

export default vehicleService;
