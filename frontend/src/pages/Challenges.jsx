import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './styles/Challenges.css';

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
  const [timer, setTimer] = useState(360); // Timer state for countdown
  const [startTime, setStartTime] = useState(null); 
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('https://supply-chain-simulation-server.vercel.app/api/challenge/');
        setChallenges(response.data);
        if (response.data.length > 0) {
          initializeChallenge();  // Initialize the first challenge
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
    setStartTime(Date.now()); // Set start time for the challenge
    setTimer(360); // Reset timer for the new challenge
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
      }, 360000);

      return () => clearInterval(interval);
    }, 360000); // Change the challenge every 30 seconds

    return () => clearInterval(interval);
  }, [challenges.length]);

  useEffect(() => {
    if (timer === 0) {
      handleSubmit(new Event('submit')); // Automatically submit if timer reaches 0
    }

    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

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
        'https://supply-chain-simulation-server.vercel.app/api/submit/submission', 
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
      setPointsAwarded(evaluateResponse.data.pointsAwarded);
      setFeedback(evaluateResponse.data.feedback);
      setTotalScore(evaluateResponse.data.total_score);
      setTimeTaken(evaluateResponse.data.timeElapsed);
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
            <div className="timer">Time Left: {formatTime(timer)}</div> 
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
                <p>Time Taken: {formatTime(timeTaken)} seconds</p>
              </div>
            )}
          </div>
          <div className="total-score">
            <h3>Total Team Score: {totalScore}</h3>
            <h4>Questions Answered: {questionsAnswered}</h4>
          </div>
        </>
      )}
      {floatingCurrencies}
    </div>
  );
};

export default Challenges;
