// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RegisterTeam from './pages/RegisterTeam';
import TeamDashboard from './pages/TeamDashboard';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterTeam />} />
        <Route path="/dashboard" element={<TeamDashboard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path = "/login" element={<Login />} />
        {/* <Route path="/simulation" element={<SimulationSession />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
    
  );
}

export default App;
