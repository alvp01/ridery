// src/services/vehicleServices.js
import rideryTestClient from '../api/rideryTestClient';

const getAllTheVehicles = async (params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
  );

  const queryString = new URLSearchParams(filteredParams).toString();

  const response = await rideryTestClient.get(`/api/v1/vehicles?${queryString}`);
  return response;
};

const addVehicle = async (vehicleData) => {
  const response = await rideryTestClient.post(`/api/v1/vehicles`, vehicleData);
  return response;
};

export const vehicleServices = {
  getAllTheVehicles,
  addVehicle,
};