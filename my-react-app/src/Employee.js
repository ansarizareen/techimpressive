import axios from 'axios';

const API_URL = 'http://localhost:5000/employees';

// Get all employees
export const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new employee
export const addEmployee = async (employee) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

// Update an existing employee
export const updateEmployee = async (id, updatedEmployee) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedEmployee);
  return response.data;
};

// Delete an employee
export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
