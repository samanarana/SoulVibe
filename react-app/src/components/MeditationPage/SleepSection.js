import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSleepThunk, fetchSleepsThunk } from '../../store/sleep';
import SleepForm from './SleepForm';
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
    setModalContent(<SleepForm handleSubmit={handleSubmit} />);
  };



  const calculateSleepScore = (sleepData) => {
    let score = 0;

    // Sleep Duration Scoring
    const durationScores = {
      '6': 100, '7': 100, '8': 100, '9': 100,
      '5': 90, '10': 90,
      '4': 80, '11': 80,
      '3': 70, '12': 70,
      '2': 60, '12+': 60,
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
  const averageSleepScore = calculateAverageSleepScore();


  return (
    <div className="sleep-page-container">

      <div className="sleep-section">
        <button onClick={openModal}>Add Sleep Data</button>
      </div>

      <div className="sleep-patterns">
        <p className="title-sleep-score">Your Latest Sleep Score</p>
          <CircularProgress score={averageSleepScore} />
      </div>

      <div>
        <button>Play Sleep Sound</button>
      </div>

    </div>
  );
}

export default SleepSection;
