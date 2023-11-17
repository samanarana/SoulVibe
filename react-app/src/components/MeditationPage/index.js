import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMeditationThunk } from '../../store/meditation';
import './MeditationPage.css'
import SleepSection from './SleepSection';
import StressSection from './StressSection';

function MeditationPage() {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [meditationType, setMeditationType] = useState('');
  const dispatch = useDispatch();
  const meditations = useSelector(state => state.meditation.meditations);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeditation = { date, duration, meditation_type: meditationType };
    dispatch(createMeditationThunk(newMeditation));
    setDate('');
    setDuration('');
    setMeditationType('');
  };

  return (
    <div className="meditation-page-container">

      <SleepSection />

      <div className="meditation-form-container">
        <div className="form-meditations">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label>Duration (minutes):</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            <div>
              <label>Type:</label>
              <input type="text" value={meditationType} onChange={(e) => setMeditationType(e.target.value)} placeholder="Type of Meditation"/>
            </div>
            <button type="submit">Add Meditation</button>
          </form>
        </div>
        <div className="my-meditations-section">
          <h3>Your Meditation Sessions</h3>
          <ul>
            {Object.values(meditations).map(meditation => (
              <li key={meditation.id}>{`Date: ${meditation.date}, Duration: ${meditation.duration} minutes, Type: ${meditation.meditation_type}`}</li>
            ))}
          </ul>
        </div>
      </div>

      <StressSection />

    </div>
  );
}

export default MeditationPage;
