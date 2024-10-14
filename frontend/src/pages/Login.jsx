// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; // Optional CSS file for styling
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { setAuthData } = useAuth();
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/teams/login', {
        team_name: teamName,
        password
      });

      setAuthData({ teamId: response.data.teamId, token: response.data.token });

      console.log('Logged in successfully:', response.data);
      // Redirect to the dashboard or desired page after login
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid team name or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Team Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
