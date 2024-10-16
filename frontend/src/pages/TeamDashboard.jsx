// src/pages/TeamDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "./styles/TeamDashboard.css";

// Array of currency symbols for dynamic floating elements
const currencies = ['$', '€', '₹', '¥', '£', '₩'];

// Create multiple copies of each currency symbol
const floatingCurrencies = Array.from({ length: 50 }, (_, index) => {
  const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)];
  return (
    <span
      key={index}
      className="currency"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${4 + Math.random() * 4}s`,
      }}
    >
      {randomCurrency}
    </span>
  );
});

const TeamDashboard = () => {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const [teamDetails, setTeamDetails] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/teams/${authData.teamId}`, {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        setTeamDetails(response.data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };
    if (authData) {
      fetchTeamDetails();
    }
  }, [authData]);

  const startSimulation = () => {
    navigate('/challenges');
  };

  return (
    <div className="team-dashboard">
      <h1>Team Dashboard</h1>
      {teamDetails ? (
        <>
          <h2>Team Name: {teamDetails.team_name}</h2>
          <h3 style={{color:'#f7c04a'}}>Members:</h3>
          <ul>
            {teamDetails.team_members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <h3 style={{color:'#f7c04a'}}>Score: {teamDetails.score}</h3>
          <button onClick={startSimulation}>Start Simulation</button>
        </>
      ) : (
        <h2>Loading team details...</h2>
      )}
      {floatingCurrencies}
    </div>
  );
};

export default TeamDashboard;
