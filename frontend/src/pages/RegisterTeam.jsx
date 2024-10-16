import React from 'react';
import TeamRegistration from '../components/TeamRegistration';
import './styles/RegisterTeam.css';

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

const RegisterTeam = () => {
  return (
    <div className="register-team-container">
      <h2>Register Your Team</h2>
      <p>Join the Supply Chain Simulation Game! Please fill out the form below to register your team.</p>
      <TeamRegistration />
      {floatingCurrencies}
    </div>
  );
};

export default RegisterTeam;
