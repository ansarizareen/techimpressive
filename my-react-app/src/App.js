import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Add your custom CSS here 

const API_URL = 'http://localhost:5000/employees';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', position: '', department: '' });
  const [editEmployee, setEditEmployee] = useState(null);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true); // On successful login
  };

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(API_URL);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    if (isLoggedIn) {
      fetchEmployees();
    }
  }, [isLoggedIn]);

  // Add or update employee
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editEmployee) {
      // Update existing employee
      const updatedEmployee = { ...formData };
      try {
        const response = await axios.put(`${API_URL}/${editEmployee.id}`, updatedEmployee);
        setEmployees(employees.map(emp => (emp.id === editEmployee.id ? response.data : emp)));
        setFormData({ name: '', position: '', department: '' });
        setEditEmployee(null);
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    } else {
      // Add new employee
      const newEmployee = { ...formData };
      try {
        const response = await axios.post(API_URL, newEmployee);
        setEmployees([...employees, response.data]);
        setFormData({ name: '', position: '', department: '' });
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    }
  };

  // Handle editing employee
  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setFormData({ name: employee.name, position: employee.position, department: employee.department });
  };

  // Handle deleting employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Employee Management</h1>
      <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
      
      <h3>{editEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        />
        <button type="submit" className="submit-btn">
          {editEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position} ({employee.department})
            <button className="edit-btn" onClick={() => handleEditEmployee(employee)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
