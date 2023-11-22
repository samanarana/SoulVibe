import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createStressThunk } from '../../store/stress';
import './StressSection.css'

function StressForm({ closeModal }) {
  const [stressLevel, setStressLevel] = useState('');
  const [personalRelationships, setPersonalRelationships] = useState('');
  const [physicalSymptoms, setPhysicalSymptoms] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [nutritionHabits, setNutritionHabits] = useState('');
  const [relaxationActivities, setRelaxationActivities] = useState('');

  const dispatch = useDispatch();
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

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
    closeModal();
  };

  return (
        <div className="stress-sections" ref={formRef}>
          <p className="title-stress">What's your stress like?</p>
          <form onSubmit={handleSubmit}>
            {/* Stress Level */}
            <div>
              <label>Stress level?</label>
              <select value={stressLevel} onChange={(e) => setStressLevel(e.target.value)}>
                <option value="" disabled selected></option>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Personal Relationships */}
            <div>
              <label>Your relationships?</label>
              <select value={personalRelationships} onChange={(e) => setPersonalRelationships(e.target.value)}>
                <option value="" disabled selected></option>
                {["Stable", "Stressful", "Improving", "Strained", "Distant", "Supportive", "Conflictual", "Nonexistent"].map(relationship => (
                  <option key={relationship} value={relationship}>{relationship}</option>
                ))}
              </select>
            </div>

            {/* Physical Symptoms */}
            <div>
              <label>Any physical symptoms?</label>
              <select value={physicalSymptoms} onChange={(e) => setPhysicalSymptoms(e.target.value)}>
                <option value="" disabled selected></option>
                {["None", "Headaches", "Fatigue", "Muscle Tension", "Digestive Issues", "Sleep Disturbances", "Other"].map(symptom => (
                  <option key={symptom} value={symptom}>{symptom}</option>
                ))}
              </select>
              {physicalSymptoms === 'Other' && <input type="text" placeholder="Describe your symptoms" />}
            </div>

            {/* Exercise Frequency */}
            <div>
              <label>Exercise frequency?</label>
              <select value={exerciseFrequency} onChange={(e) => setExerciseFrequency(e.target.value)}>
                <option value="" disabled selected></option>
                {["Daily", "2-3 times a week", "Once a week", "2-3 times a month", "Rarely", "Never"].map(frequency => (
                  <option key={frequency} value={frequency}>{frequency}</option>
                ))}
              </select>
            </div>

            {/* Nutrition Habits */}
            <div>
              <label>Nutrition habits?</label>
              <select value={nutritionHabits} onChange={(e) => setNutritionHabits(e.target.value)}>
                <option value="" disabled selected></option>
                {["Balanced Diet", "Home Cooked Meals", "Fast Food Oriented", "Irregular Meals", "Vegetarian", "Vegan", "Low Carb", "High Protein"].map(habit => (
                  <option key={habit} value={habit}>{habit}</option>
                ))}
              </select>
            </div>

            {/* Relaxation Activities */}
            <div>
              <label>How do you relax?</label>
              <input
                type="text"
                value={relaxationActivities}
                onChange={(e) => setRelaxationActivities(e.target.value)}
              />
            </div>

            <div className="stress-sections-button-container">
              <button type="submit">SUBMIT</button>
            </div>

          </form>
        </div>
  );
}

export default StressForm;
