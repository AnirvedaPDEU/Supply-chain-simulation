import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Leaderboard.css';

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

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('https://supply-chain-simulation-server.vercel.app/api/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Total Score</th>
            <th>Total Time Taken</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.teamName}</td>
              <td>{team.totalScore}</td>
              <td>{formatTime(team.totalTime)}</td> {/* Format time here */}
            </tr>
          ))}
        </tbody>
      </table>
      {floatingCurrencies} {/* Add floating currencies here */}
    </div>
  );
};

export default Leaderboard;
