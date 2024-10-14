// src/components/Feedback.js
import React from 'react';

const Feedback = ({ message }) => {
  return (
    <div className="feedback">
      <p>{message}</p>
    </div>
  );
};

export default Feedback;
