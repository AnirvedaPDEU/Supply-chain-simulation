// src/pages/TeamDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "./styles/TeamDashboard.css"

const TeamDashboard = () => {
  const {authData} = useAuth();
  const navigate = useNavigate(); // Updated to useNavigate hook
  const [teamDetails, setTeamDetails] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/teams/${authData.teamId}`,{
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
  }, []);

  const startSimulation = () => {
    navigate('/challenges'); // Navigate using useNavigate
  };

  return (
    <div className="team-dashboard">
      <h1>Team Dashboard</h1>
      {teamDetails ? (
        <>
          <h2>Team Name: {teamDetails.team_name}</h2>
          <h3>Members:</h3>
          <ul>
            {teamDetails.team_members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <h3>Score: {teamDetails.score}</h3>
          <button onClick={startSimulation}>Start Simulation</button>
        </>
      ) : (
        <h2>Loading team details...</h2>
      )}
    </div>
  );
};

export default TeamDashboard;
