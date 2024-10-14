// /src/pages/RegisterTeam.js
import React from 'react';
import TeamRegistration from '../components/TeamRegistration';
import './styles/RegisterTeam.css';

const RegisterTeam = () => {
  return (
    <div className="register-team-container">
      <h2>Register Your Team</h2>
      <p>
        Join the Supply Chain Simulation Game! Please fill out the form below to register your team.
      </p>
      <TeamRegistration />
    </div>
  );
};

export default RegisterTeam;
