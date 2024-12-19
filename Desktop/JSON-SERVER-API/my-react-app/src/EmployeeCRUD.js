import React from "react";
import EmployeeList from "./EmployeeList";
import "./EmployeeCRUD.css";

function EmployeeCRUD({ onLogout }) {
  return (
    <div className="employee-crud-container">
      <header>
        <h1>Employee Management</h1>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </header>
      <EmployeeList />
    </div>
  );
}

export default EmployeeCRUD;
