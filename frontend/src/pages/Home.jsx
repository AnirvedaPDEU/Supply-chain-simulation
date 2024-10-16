import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

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

  return (
    <div className="home-container">
      <h1 className="main-heading">ANIRVEDA</h1>
      <h2 className="home-title">Get! Get! Supply!!!</h2>
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

      {/* Render multiple floating currency elements */}
      {floatingCurrencies}
    </div>
  );
};

export default Home;
