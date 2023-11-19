import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStressThunk } from '../../store/stress';
import './StressSection.css'

function StressSection() {
  const [stressLevel, setStressLevel] = useState('');
  const [personalRelationships, setPersonalRelationships] = useState('');
  const [physicalSymptoms, setPhysicalSymptoms] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [nutritionHabits, setNutritionHabits] = useState('');
  const [relaxationActivities, setRelaxationActivities] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStressData = {
      stress_level: stressLevel,
      personal_relationships: personalRelationships,
      physical_symptoms: physicalSymptoms,
      exercise_frequency: exerciseFrequency,
      nutrition_habits: nutritionHabits,
      relaxation_activities: relaxationActivities
    };
    dispatch(createStressThunk(newStressData));
    // Clear form fields after submission

  };

  // Logic for providing suggestions based on stress level
  const provideSuggestions = () => {
    if (stressLevel === 'High') {
      return 'Consider practicing deep breathing exercises and engaging in regular physical activity.';
    }
    // Add more conditions based on the survey responses
    return 'Keep maintaining good habits!';
  };

  return (
    <div className="stress-section-container">
      <h2>Stress Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stress Level:</label>
          <select value={stressLevel} onChange={(e) => setStressLevel(e.target.value)}>
            <option value="">Select...</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
      <div className="suggestions">
        <h3>Suggestions for You</h3>
        <p>{provideSuggestions()}</p>
        <a href="/exercise">Go to Exercise Page</a>
        <a href="/journal">Go to Journal Page</a>
      </div>
    </div>
  );
}

export default StressSection;
