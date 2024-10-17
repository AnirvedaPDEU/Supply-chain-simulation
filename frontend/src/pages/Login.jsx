import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css';
import { useAuth } from '../context/AuthContext';

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

const Login = () => {
  const { setAuthData } = useAuth();
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://supply-chain-simulation-server.vercel.app/api/teams/login', {
        team_name: teamName,
        password
      });

      setAuthData({ teamId: response.data.teamId, token: response.data.token });
      console.log('Logged in successfully:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid team name or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Team Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" style={{background:"#f7c04a"}}>Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
      {floatingCurrencies}
    </div>
    
  );
};

export default Login;
