import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSleepThunk, fetchSleepsThunk } from '../../store/sleep';
import SleepForm from './SleepForm';
import SleepSounds from './SleepSounds';
import CircularProgress from './CircularProgress';
import { useModal } from './../../context/Modal';
import './SleepSection.css';


function SleepSection() {
  const dispatch = useDispatch();
  const sleeps = useSelector(state => state.sleep.sleeps);
  const { setModalContent, closeModal } = useModal();


  useEffect(() => {
    dispatch(fetchSleepsThunk());
  }, [dispatch]);

  const handleSubmit = (sleepData) => {
    dispatch(createSleepThunk(sleepData))
      .then(() => {
        closeModal();
      });
  };

  const openModal = () => {
    setModalContent(<SleepForm handleSubmit={handleSubmit} closeModal={closeModal} />);
  };


  const calculateSleepScore = (sleepData) => {
    let score = 0;

    // Sleep Duration Scoring
    const durationScores = {
      '6': 100, '7': 100, '8': 100, '9': 100,
      '5': 90, '10': 90,
      '4': 80, '11': 80,
      '3': 70, '12': 70,
      '2': 60,
      '1': 50
    };
    score += durationScores[sleepData.sleep_duration] || 50;

    // Quality of Sleep Scoring
    const qualityScores = {
      'Excellent': 100,
      'Great': 90,
      'Good': 80,
      'Fair': 70,
      'Poor': 60,
      'No Sleep': 50
    };
    score += qualityScores[sleepData.quality_of_sleep] || 50;

    // Dreams Scoring
    score += sleepData.dreams === 'Yes' ? 20 : 10;

    // Alcohol Scoring
    score += sleepData.alcohol === 'Yes' ? -20 : 20;

    // Morning Mood Scoring
    const moodScores = {
      'Energetic': 100,
      'Stressed': 60,
      'Relaxed': 100,
      'Anxious': 60,
      'Joyful': 100,
      'Irritable': 60,
      'Groggy': 70,
      'Restless': 70,
      'Refreshed': 100
    };
    score += moodScores[sleepData.morning_mood] || 50;

    // Normalize the score to 0-100 scale
    const normalizedScore = Math.max(0, Math.min(score / 5, 100));
    return normalizedScore;
  };

  // Calculate average sleep score
  const calculateAverageSleepScore = () => {
    const sleepScores = Object.values(sleeps).map(sleepData => calculateSleepScore(sleepData));
    const totalScore = sleepScores.reduce((acc, score) => acc + score, 0);
    const averageScore = sleepScores.length > 0 ? totalScore / sleepScores.length : 0;
    return Math.ceil(averageScore);
  };

  const getSleepScoreMessage = (score) => {
    if (score >= 100) return "Outstanding! You've achieved the ideal sleep pattern. Keep up these fantastic sleep habits.";
    if (score >= 90) return "Excellent! Your sleep routine is almost perfect. Remember, quality sleep is key to overall health.";
    if (score >= 80) return "Great work! Your sleep quality is high. Ensure you keep a balanced sleep schedule to maintain this.";
    if (score >= 70) return "You're doing well with your sleep habits. Keep up the good work and aim for consistency.";
    if (score >= 60) return "Good job! Your sleep is decent, but a few adjustments could make it even better.";
    if (score >= 50) return "You're halfway there! Maintaining a calm and cool sleeping environment can help further.";
    if (score >= 40) return "You're on the right track. Keep focusing on healthy sleep habits, like reducing screen time before bed.";
    if (score >= 30) return "You're making progress, but there's more to be done for a restful night. Look into relaxation techniques before bed.";
    if (score >= 20) return "There's significant room for enhancing your sleep. Try to establish a consistent sleep schedule";
    return "Your sleep quality is quite low. Consider adjusting your bedtime routine and environment for better rest.";
  };

  const averageSleepScore = calculateAverageSleepScore();
  const sleepScoreMessage = getSleepScoreMessage(averageSleepScore);

  return (
    <div className="sleep-page-container">

      <div className="sleep-section">
        <button onClick={openModal}>Add Sleep Data</button>
      </div>

      <div className="sleep-patterns">
        <p className="title-sleep-score">Your Latest Sleep Score</p>
          <CircularProgress score={averageSleepScore} />
          <p className="sleep-score-message">{sleepScoreMessage}</p>
      </div>

      <div className="sleep-sounds">
        <SleepSounds />
      </div>

    </div>
  );
}

export default SleepSection;
