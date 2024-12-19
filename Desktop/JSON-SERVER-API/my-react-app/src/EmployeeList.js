import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleAddEmployee = () => {
    if (!name || !department) {
      alert("Name and department are required!");
      return;
    }
    const newEmployee = { name, department };

    axios
      .post("http://localhost:5000/employees", newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setName("");
        setDepartment("");
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  const handleEditEmployee = (employee) => {
    setEditing(employee);
    setName(employee.name);
    setDepartment(employee.department);
  };

  const handleUpdateEmployee = () => {
    if (!editing) return;

    const updatedEmployee = { name, department };

    axios
      .put(`http://localhost:5000/employees/${editing.id}`, updatedEmployee)
      .then((response) => {
        setEmployees(
          employees.map((emp) =>
            emp.id === editing.id ? response.data : emp
          )
        );
        setEditing(null);
        setName("");
        setDepartment("");
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  const handleDeleteEmployee = (id) => {
    axios
      .delete(`http://localhost:5000/employees/${id}`)
      .then(() => setEmployees(employees.filter((emp) => emp.id !== id)))
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <div className="employee-list">
      <h1>Employee Management</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        {editing ? (
          <button className="btn btn-primary" onClick={handleUpdateEmployee}>
            Update Employee
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleAddEmployee}>
            Add Employee
          </button>
        )}
        {editing && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditing(null);
              setName("");
              setDepartment("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <ul>
        {employees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <span>
              {employee.name} - {employee.department}
            </span>
            <div>
              <button
                className="btn btn-warning"
                onClick={() => handleEditEmployee(employee)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteEmployee(employee.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
