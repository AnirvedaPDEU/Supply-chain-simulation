// src/components/Challenges.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './styles/Challenges.css';

const Challenges = () => {
  const { authData } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(null); // State for points awarded
  const [feedback, setFeedback] = useState(''); // State for feedback

  useEffect(() => {
    // Fetch challenges from the API
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/challenge/');
        setChallenges(response.data); // assuming the data is an array of challenges
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    // Update the challenge every 8 minutes (480,000 milliseconds)
    const interval = setInterval(() => {
      setCurrentChallengeIndex((prevIndex) =>
        (prevIndex + 1) % challenges.length
      );
      setIsSubmitted(false); // Reset submission state when changing challenge
      setSelectedOption(''); // Reset selected option
      setPointsAwarded(null); // Reset points awarded
      setFeedback(''); // Reset feedback
    }, 480000); // 480000 ms = 8 minutes

    return () => clearInterval(interval);
  }, [challenges.length]);

  // If there are no challenges yet, show a loading message
  if (challenges.length === 0) {
    return <div>Loading challenges...</div>;
  }

  const currentChallenge = challenges[currentChallengeIndex];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }

    try {
      // Call the evaluateScore API
      const evaluateResponse = await axios.post(
        'http://localhost:4000/api/submit/submission', 
        {
          teamId: authData.teamId, // Assuming teamId is stored in authData
          challengeId: currentChallenge._id,
          selectedOption
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`, // Use the token for authorization
          },
        }
      );

      // Log the response from the API
      console.log('Score evaluation response:', evaluateResponse.data);
      
      // Set points awarded and feedback from the API response
      setPointsAwarded(evaluateResponse.data.pointsAwarded);
      setFeedback(evaluateResponse.data.feedback);
      
      // Mark as submitted
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="challenge-viewer">
      <h2>Current Challenge</h2>
      <div className="challenge">
        <h3>{currentChallenge.question_text}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            {currentChallenge.options.map((option, index) => (
              <div key={index}>
                <input 
                  type="radio" 
                  value={option.option_text} 
                  checked={selectedOption === option.option_text}
                  onChange={handleOptionChange}
                />
                {option.option_text}
              </div>
            ))}
          </div>
          <button type="submit" disabled={isSubmitted}>
            {isSubmitted ? 'Submitted' : 'Submit'}
          </button>
        </form>
        {isSubmitted && (
          <div>
            <p>Your submission has been recorded.</p>
            <p>Points Awarded: {pointsAwarded}</p>
            <p>Feedback: {feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
