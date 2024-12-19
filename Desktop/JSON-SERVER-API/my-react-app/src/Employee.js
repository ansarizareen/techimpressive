// Employee.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', job: '' });
  const [editEmployee, setEditEmployee] = useState({ id: null, name: '', job: '' });

  useEffect(() => {
    // Fetch all employees from the JSON server
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees', error));
  }, []);

  // Function to handle add new employee (POST)
  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.job) {
      axios.post('http://localhost:5000/employees', newEmployee)
        .then(response => {
          setEmployees([...employees, response.data]);
          setNewEmployee({ name: '', job: '' });
        })
        .catch(error => console.error('Error adding employee', error));
    }
  };

  // Function to handle employee delete (DELETE)
  const handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => console.error('Error deleting employee', error));
  };

  // Function to handle edit employee (PUT)
  const handleEditEmployee = (id) => {
    axios.put(`http://localhost:5000/employees/${id}`, editEmployee)
      .then(response => {
        setEmployees(employees.map(employee =>
          employee.id === id ? response.data : employee
        ));
        setEditEmployee({ id: null, name: '', job: '' });
      })
      .catch(error => console.error('Error updating employee', error));
  };

  return (
    <div className="employee-container">
      <h2>Employee Management</h2>

      {/* Add Employee */}
      <div className="employee-form">
        <input
          type="text"
          placeholder="Enter name"
          value={newEmployee.name}
          onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter job title"
          value={newEmployee.job}
          onChange={e => setNewEmployee({ ...newEmployee, job: e.target.value })}
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      {/* Edit Employee Form */}
      {editEmployee.id && (
        <div className="employee-form">
          <input
            type="text"
            value={editEmployee.name}
            onChange={e => setEditEmployee({ ...editEmployee, name: e.target.value })}
          />
          <input
            type="text"
            value={editEmployee.job}
            onChange={e => setEditEmployee({ ...editEmployee, job: e.target.value })}
          />
          <button onClick={() => handleEditEmployee(editEmployee.id)}>Update Employee</button>
        </div>
      )}

      {/* Employee List */}
      <ul className="employee-list">
        {employees.map(employee => (
          <li key={employee.id} className="employee-item">
            <span>{employee.name} - {employee.job}</span>
            <button onClick={() => { setEditEmployee(employee); }}>Edit</button>
            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;
