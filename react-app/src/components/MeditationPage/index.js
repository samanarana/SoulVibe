import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMeditationThunk, fetchMeditationsThunk } from '../../store/meditation';
import './MeditationPage.css'
import SleepSection from './SleepSection';
import StressSection from './StressSection';

function MeditationPage() {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [meditationType, setMeditationType] = useState('');
  const dispatch = useDispatch();
  const meditations = useSelector(state => state.meditation.meditations);

  useEffect(() => {
    dispatch(fetchMeditationsThunk());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toLocaleDateString('en-US', { timeZone: 'CST' });
  };

  const handleDateChange = (e) => {
    const localDate = new Date(e.target.value + 'T00:00');
    setDate(localDate.toISOString().split('T')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeditation = { date, duration, meditation_type: meditationType };
    dispatch(createMeditationThunk(newMeditation));
    setDate('');
    setDuration('');
    setMeditationType('');
  };

  const sortedMeditations = Object.values(meditations).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="meditation-page-container">

      <SleepSection />

      <div className="meditation-section">
        <div className="meditation-form-section">
          <div className="form-meditations">
            <p className="title-meditation">What was today's meditation like?</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <label>Duration:</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="# Minutes"/>
              </div>
              <div>
                <label>Type:</label>
                <input type="text" value={meditationType} onChange={(e) => setMeditationType(e.target.value)} placeholder="Type of Meditation"/>
              </div>
              <div className="form-button-container">
                <button type="submit">ADD SESSION</button>
              </div>
            </form>
          </div>
        </div>

      <div className="my-meditations-section">
        <p className="title-meditation">My Meditation Practices</p>
        <ul>
          {sortedMeditations.map(meditation => (
            <li key={meditation.id}>{`${formatDate(meditation.date)}, ${meditation.meditation_type}`}</li>
          ))}
        </ul>
      </div>
      </div>

      <StressSection />

    </div>
  );
}

export default MeditationPage;
