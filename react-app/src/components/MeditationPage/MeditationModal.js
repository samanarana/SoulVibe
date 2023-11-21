import React, { useState } from 'react';
import './MeditationModal.css';

function MeditationForm({ handleSubmit }) {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [meditation_type, setMeditationType] = useState('');

  const isFormInvalid = () => {
    return !date || duration < 5 || duration > 60 || !meditation_type;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ date, duration, meditation_type });
    // Reset form fields
    setDate('');
    setDuration('');
    setMeditationType('');
  };

  return (
    <div className="form-meditations">
        <p className="title-meditation">What was today's meditation like?</p>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
                <label>Duration:</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="# Minutes" min="5" max="60"/>
            </div>
            <div>
                <label>Type:</label>
                <select value={meditation_type} onChange={(e) => setMeditationType(e.target.value)}>
                    <option value="">Select Meditation Type</option>
                    <option value="Mindfulness">Mindfulness</option>
                    <option value="Guided Visualization">Guided Visualization</option>
                    <option value="Kundalini Yoga">Kundalini Yoga</option>
                    <option value="Tai Chi">Tai Chi</option>
                    <option value="Nature Walk">Nature Walk</option>
                    <option value="Mantra">Mantra</option>
                    <option value="Chakra Meditation">Chakra Meditation</option>
                    <option value="Writing">Writing</option>
                    <option value="Psychedelics">Psychedelics</option>
                    <option value="Reflective Meditation">Reflective Meditation</option>
                </select>
            </div>
            <div className="form-button-container">
              <button type="submit" disabled={isFormInvalid()}>ADD SESSION</button>
            </div>
        </form>
    </div>
);
}


export default MeditationForm;
