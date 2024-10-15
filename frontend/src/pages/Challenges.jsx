import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './styles/Challenges.css';

const FinalScore = ({ totalScore, questionsAnswered }) => (
  <div className="final-score">
    <h2>Congratulations!</h2>
    <p>All challenges have been completed.</p>
    <h3>Your Final Team Score: {totalScore}</h3>
    <h4>Total Questions Answered: {questionsAnswered}</h4>
  </div>
);

const Challenges = () => {
  const { authData } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [startTime, setStartTime] = useState(null); 
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/challenge/');
        setChallenges(response.data);
        if (response.data.length > 0) {
          initializeChallenge();  // Set start time for the first challenge
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  const initializeChallenge = () => {
    setIsSubmitted(false);
    setSelectedOption('');
    setPointsAwarded(null);
    setFeedback('');
    setTimeTaken(null); 
    setStartTime(Date.now()); // Correctly set the start time when challenge is initialized
    console.log(startTime)
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChallengeIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex >= challenges.length) {
          setIsComplete(true);
          clearInterval(interval);
          return prevIndex;
        } else {
          initializeChallenge(); // Re-initialize for the new challenge
          return newIndex;
        }
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [challenges.length]);

  if (challenges.length === 0) {
    return <div>Loading challenges...</div>;
  }

  const currentChallenge = challenges[currentChallengeIndex];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }

    try {
      const evaluateResponse = await axios.post(
        'http://localhost:4000/api/submit/submission', 
        {
          teamId: authData.teamId,
          challengeId: currentChallenge._id,
          selectedOption,
          startTime
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      console.log(evaluateResponse.data)
      setPointsAwarded(evaluateResponse.data.pointsAwarded);
      setFeedback(evaluateResponse.data.feedback);
      setTotalScore(evaluateResponse.data.total_score);
      setTimeTaken(evaluateResponse.data.timeElapsed); // Capture time taken from backend
      setIsSubmitted(true);
      
      setQuestionsAnswered((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="challenge-viewer">
      {isComplete ? (
        <FinalScore totalScore={totalScore} questionsAnswered={questionsAnswered} />
      ) : (
        <>
          <h2>Current Challenge</h2>
          <div className="challenge">
            <h3>{currentChallenge.question_text}</h3>
            <form onSubmit={handleSubmit}>
              <div>
                {currentChallenge.options.map((option, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`option-button ${selectedOption === option.option_text ? 'selected' : ''}`}
                    onClick={() => handleOptionChange(option.option_text)}
                  >
                    {option.option_text}
                  </button>
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
                <p>Time Taken: {timeTaken} seconds</p>
              </div>
            )}
          </div>
          <div className="total-score">
            <h3>Total Team Score: {totalScore}</h3>
            <h4>Questions Answered: {questionsAnswered}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Challenges;
