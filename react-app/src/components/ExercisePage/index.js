import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExercisesThunk, createExerciseThunk, editExerciseThunk, deleteExerciseThunk } from '../../store/exercise';
import './ExercisePage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const ExercisePage = () => {
  // state for handling form inputs
  const [date, setDate] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');

  const dispatch = useDispatch();

  // Fetching the exercises from store
  useEffect(() => {
    dispatch(fetchExercisesThunk());
  }, [dispatch]);

  // Accessing exercises state from store
  const exercises = useSelector(state => state.exercise.exercises);

  // Handlers for form inputs
  const handleDateChange = (e) => setDate(e.target.value);
  const handleExerciseTypeChange = (e) => setExerciseType(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);
  const handleIntensityChange = (e) => setIntensity(e.target.value);

  // date formatting
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  };

  // Handler for adding new exercise
  const handleAddExercise = () => {
    const newExercise = {
      date,
      exerciseType,
      duration,
      intensity,
    };
    dispatch(createExerciseThunk(newExercise));
  };

  // Handler for removing exercise
  const handleRemoveExercise = (id) => {
    dispatch(deleteExerciseThunk(id));
  };

  return (
    <div className="full-page-container">
        <div className="exercise-page">

            <div className="exercise-list-container">
              <p className="title-exercise-list">My Exercises</p>

              <div className="exercise-list">
                {exercises && Object.values(exercises).map((exercise) => (
                  <div key={exercise.id} className="exercise-entry">
                    <span>{formatDate(exercise.date)}</span>
                    <span>Type: {exercise.exercise_type}</span>
                    <span>Duration: {exercise.duration} minutes</span>
                    <span>Intensity: {exercise.intensity}</span>
                    <button onClick={() => handleRemoveExercise(exercise.id)}>
                      <FontAwesomeIcon icon={faTrashCan} style={{color: "#181d25"}} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="exercise-input-container">
                <div className="input-field input-field-date">
                  <input type="date" value={date} onChange={handleDateChange} />
                </div>
                <div className="input-field input-field-type">
                  <input type="text" placeholder="Exercise Type" value={exerciseType} onChange={handleExerciseTypeChange} />
                </div>
                <div className="input-field input-field-duration">
                  <input type="text" placeholder="Duration" value={duration} onChange={handleDurationChange} />
                </div>
                <div className="input-field input-field-intensity">
                  <input type="text" placeholder="Intensity" value={intensity} onChange={handleIntensityChange} />
                </div>

                <div className="submit-button-container">
                  <button className="add-exercise-button" onClick={handleAddExercise}>Add Exercise</button>
                </div>
            </div>

        </div>
    </div>
);

};

export default ExercisePage;
