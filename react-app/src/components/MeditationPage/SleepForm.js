import React, { useState, useEffect, useRef } from 'react';
import './SleepSection.css';

function SleepForm({ handleSubmit, closeModal }) {
  const [sleepDuration, setSleepDuration] = useState('');
  const [qualityOfSleep, setQualityOfSleep] = useState('');
  const [morningMood, setMorningMood] = useState('');
  const [dreams, setDreams] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const modalRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      sleep_duration: sleepDuration,
      quality_of_sleep: qualityOfSleep,
      morning_mood: morningMood,
      dreams: dreams,
      alcohol: alcohol
    });
    closeModal();
    // Reset form fields
    setSleepDuration('');
    setQualityOfSleep('');
    setMorningMood('');
    setDreams('');
    setAlcohol('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Return a cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  const isFormComplete = sleepDuration && qualityOfSleep && morningMood && dreams && alcohol;

  return (
<div className="sleep-form">
      <p className="title-sleep">How did you sleep?</p>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>How long did you sleep?</label>
            <select value={sleepDuration} onChange={(e) => setSleepDuration(e.target.value)}>
            <option value="" disabled selected>How many hours?</option>
              {[...Array(11)].map((_, i) => <option key={i} value={i+1}>{i+1}</option>)}
              <option value="12+">12+</option>
            </select>
          </div>
          <div>
            <label>Your quality of sleep?</label>
            <select value={qualityOfSleep} onChange={(e) => setQualityOfSleep(e.target.value)}>
            <option value="" disabled selected>Hopefully good!</option>
              {['Excellent', 'Great', 'Good', 'Fair', 'Poor', 'No Sleep'].map((quality, i) => <option key={i} value={quality}>{quality}</option>)}
            </select>
          </div>
          <div>
            <label>Morning mood?</label>
            <select value={morningMood} onChange={(e) => setMorningMood(e.target.value)}>
            <option value="" disabled selected>How do you feel?</option>
              {['Energetic', 'Stressed', 'Relaxed', 'Anxious', 'Joyful', 'Irritable', 'Groggy', 'Restless', 'Refreshed'].map((mood, i) => <option key={i} value={mood}>{mood}</option>)}
            </select>
          </div>
          <div className="button-group">
            <label>Did you have any dreams or nightmares?</label>
            <button type="button" className={dreams === 'Yes' ? 'selected' : ''} onClick={() => setDreams('Yes')}>Yes</button>
            <button type="button" className={dreams === 'No' ? 'selected' : ''} onClick={() => setDreams('No')}>No</button>
          </div>
          <div className="button-group">
            <label>Did you consume alcohol before bed?</label>
            <button type="button" className={alcohol === 'Yes' ? 'selected' : ''} onClick={() => setAlcohol('Yes')}>Yes</button>
            <button type="button" className={alcohol === 'No' ? 'selected' : ''} onClick={() => setAlcohol('No')}>No</button>
          </div>
          <div className="form-button-container">
            <button type="submit" disabled={!isFormComplete}>ADD SLEEP DATA</button>
          </div>
        </form>
      </div>
  );
}

export default SleepForm;
