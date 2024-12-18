import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import './Employee.css'; // Ensure to import your CSS file

const initialEmployees = [
  { id: "1", Name: "Manoj Mishra", Age: "28" },
  { id: "2", Name: "Sneha Sharma", Age: "25" },
  { id: "3", Name: "Preeti Kashyap", Age: "30" },
  { id: "4", Name: "Rahul Verma", Age: "36" }
];

const Employee = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ Name: '', Age: '' });
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setNewEmployee({ Name: '', Age: '' });
    setEditingEmployee(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp))
      );
    } else {
      const newId = (employees.length + 1).toString();
      setEmployees([...employees, { id: newId, ...newEmployee }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({ Name: employee.Name, Age: employee.Age });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h3>Employee List</h3>
      <Table bordered striped hover className="mt-4" style={{ width: "70%", margin: "20px auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.Name}</td>
              <td>{employee.Age}</td>
              <td>
                <div className="employee-actions"> {/* Flex container for buttons */}
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(employee)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleShow} style={{ margin: '20px' }}>
        Add New Employee
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingEmployee ? "Edit Employee" : "Add New Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="Name"
                value={newEmployee.Name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="Age"
                value={newEmployee.Age}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingEmployee ? "Save Changes" : "Add Employee"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Employee;
