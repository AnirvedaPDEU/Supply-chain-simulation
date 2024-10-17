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
      <h2 className="home-title">Get! Set! Supply!!!</h2>
      <button className="register-button" onClick={handleRegisterClick}>
        Register Now
      </button>
      <h2 className="main-heading">Game Guidelines</h2>
      <ul className="guidelines">
        <li>Each team must register with a unique name.</li>
        <li>Categories include Growing and Established.</li>
        <li> Ensure a reliable internet connection, as Anirveda will not be responsible for any connectivity issues during the simulation.</li>
        <li> Once the simulation starts, please do not refresh the page or navigate away, as this will reset the timer.</li>
        <li> Refrain from using any online AI tools or switching tabs during the simulation.</li>
        <li>The leaderboard will be updated after each challenge.</li>
        <li> Choose a simple password for ease of access; we will not have access to recover it if forgotten.</li>
        <li> Each question will be displayed for 6 minutes:
        <ul>
            <li>Hosts will explain the question for 2 minutes.</li>
            <li>Teams will have 4 minutes to discuss and formulate their answers.</li>
        </ul>
        </li>
        <li> Consider your solutions based on your assigned category: either <em>Growing</em> or <em>Established</em>.</li>
        <li> In the event of any disputes regarding the questions, the decisions made by Anirveda will be deemed final.</li>
      </ul>

      {/* Render multiple floating currency elements */}
      {floatingCurrencies}
    </div>
  );
};

export default Home;
