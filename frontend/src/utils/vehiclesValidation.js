export const vehicleValidationRules = {
  make: (value) => (value.length >= 3 || 'Make must be at least 3 characters long'),
  model: (value) => (value.length >= 3 || 'Model must be at least 3 characters long'),
  year: (value) => (value !== null || 'Year is required'),
  status: (value) => (['active', 'maintenance', 'on service'].includes(value) || 'Status is required'),
};