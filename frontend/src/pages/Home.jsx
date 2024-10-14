// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css'; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Redirect to the team registration page
    navigate('/register');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Get! Get! supply!!!</h1>
      <button className="register-button" onClick={handleRegisterClick}>
        Register Now
      </button>
      <h2>Game Guidelines</h2>
      <ul className="guidelines">
        <li>Each team must register with a unique name.</li>
        <li>Teams can have up to 5 members.</li>
        <li>Categories include Growing and Established.</li>
        <li>Participate in challenges to earn points.</li>
        <li>The leaderboard will be updated after each challenge.</li>
      </ul>
    </div>
  );
};

export default Home;
