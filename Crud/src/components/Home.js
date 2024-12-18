import React from 'react';
import { Link } from 'react-router-dom';
import Employee from './Employee';  // Employee CRUD component
import { Button } from 'react-bootstrap'; // Keep this import if you use Button
import './Home.css'; // Ensure to import your updated CSS here

const Home = ({ onLogout }) => {
  return (
    <div>
      <header className="header-container">
        <h1 className="header-title">Employee Management</h1>
        <Button className="logout-button" variant="danger" onClick={onLogout}>
          Logout
        </Button>
      </header>
      <div className="content">
        <h2 className="welcome-title">Welcome to Employee Management</h2>
        <Employee />
        <Link to="/certificate">
          <button style={{ marginTop: '20px' }}>Generate Certificate</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
