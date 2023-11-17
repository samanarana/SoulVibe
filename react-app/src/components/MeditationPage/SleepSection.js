import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSleepThunk, fetchSleepsThunk } from '../../store/sleep';
import './SleepSection.css'

function SleepSection() {
  const [sleepDuration, setSleepDuration] = useState('');
  const [qualityOfSleep, setQualityOfSleep] = useState('');
  const dispatch = useDispatch();
  const sleeps = useSelector(state => state.sleep.sleeps);

  useEffect(() => {
    dispatch(fetchSleepsThunk()); // Fetch sleep data on component mount
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSleep = { sleep_duration: sleepDuration, quality_of_sleep: qualityOfSleep };
    dispatch(createSleepThunk(newSleep));
    setSleepDuration('');
    setQualityOfSleep('');
  };

  // Function to play sleep sound (example implementation)
  const playSleepSound = () => {
    // You'll need to add the actual logic for playing the sound
    console.log('Playing sleep sound...');
  };

  return (
    <div className="sleep-page-container">
      <div className="sleep-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Sleep Duration (hours):</label>
            <input type="number" value={sleepDuration} onChange={(e) => setSleepDuration(e.target.value)} />
          </div>
          <div>
            <label>Quality of Sleep:</label>
            <input type="text" value={qualityOfSleep} onChange={(e) => setQualityOfSleep(e.target.value)} placeholder="Good, Fair, Poor"/>
          </div>
          <button type="submit">Add Sleep Data</button>
        </form>
      </div>

      <div>
        <h2>Your Sleep Patterns</h2>
        <ul>
          {Object.values(sleeps).map(sleep => (
            <li key={sleep.id}>{`Duration: ${sleep.sleep_duration} hours, Quality: ${sleep.quality_of_sleep}`}</li>
          ))}
        </ul>
      </div>


    <div>
    <button onClick={playSleepSound}>Play Sleep Sound</button>
    </div>

    </div>
  );
}

export default SleepSection;
