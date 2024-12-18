import React from 'react';
import './Certificate.css';  // Custom CSS for styling

const Certificate = ({ name, award, date }) => {
  return (
    <div className="certificate-container">
      <img src={require('../assets/certificate-template.jpg')} alt="Certificate" className="certificate-background" />
      <div className="certificate-content">
        <div className="certificate-text name">{name}</div>
        <div className="certificate-text award">{award}</div>
        <div className="certificate-text date">{date}</div>
      </div>
    </div>
  );
};

export default Certificate;
