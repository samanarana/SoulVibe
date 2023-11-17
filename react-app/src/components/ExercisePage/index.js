import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExercisesThunk, createExerciseThunk, editExerciseThunk, deleteExerciseThunk } from '../../store/exercise';
import './ExercisePage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

const ExercisePage = () => {
  const [date, setDate] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const exercises = useSelector(state => state.exercise.exercises);

  useEffect(() => {
    dispatch(fetchExercisesThunk());
  }, [dispatch]);


  const validateForm = () => {
    const validationErrors = {};
    if (!date) {
      validationErrors.date = 'Please select a date for the exercise.';
    }
    if (!exerciseType.match(/^[a-zA-Z ]+$/) || exerciseType.length < 4 || exerciseType.length > 30) {
      validationErrors.exerciseType = 'Exercise type must contain only letters.';
    }
    if (!duration || isNaN(duration) || duration <= 0 || duration > 360) {
      validationErrors.duration = 'Please enter a duration less than 360 minutes.';
    }
    if (!intensity) {
      validationErrors.intensity = 'Please select an intensity level.';
    }
    return validationErrors;
  };

  const handleDateChange = (e) => setDate(e.target.value);
  const handleExerciseTypeChange = (e) => setExerciseType(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);
  const handleIntensityChange = (e) => setIntensity(e.target.value);

  const formatDateForInput = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getUTCFullYear();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
    // Split the dateString into components
    const parts = dateString.split(' ');
    const dateParts = parts[1] + ' ' + parts[2] + ' ' + parts[3];

    // Parse the date as UTC
    const dateObj = new Date(dateParts + ' UTC');

    // Format the date
    const year = dateObj.getUTCFullYear();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getUTCDate().toString().padStart(2, '0');

    return `${month}/${day}/${year}`;
  };

  const handleViewDetails = (exerciseId) => {
    const exercise = exercises[exerciseId];
    if (exercise) {
      const formattedDate = formatDateForInput(exercise.date);
      setDate(formattedDate);
      setExerciseType(exercise.exercise_type);
      setDuration(exercise.duration);
      setIntensity(exercise.intensity);
      setIsEditing(true);
      setEditingExerciseId(exerciseId);
    }
  };

  const handleSaveExercise = () => {
    setIsSubmitted(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const exerciseData = {
      date,
      exercise_type: exerciseType,
      duration,
      intensity,
    };

    if (isEditing) {
      dispatch(editExerciseThunk(editingExerciseId, exerciseData));
    } else {
      dispatch(createExerciseThunk(exerciseData));
    }

    resetFormToAddMode();
  };

  const resetFormToAddMode = () => {
    setDate('');
    setExerciseType('');
    setDuration('');
    setIntensity('');
    setIsEditing(false);
    setEditingExerciseId(null);
    setErrors('');
  };

  const handleRemoveExercise = (id) => {
    dispatch(deleteExerciseThunk(id));
  };

  const getIntensityEmoji = (intensity) => {
    switch (intensity) {
      case 'Low': return 'Low 💧';
      case 'Moderate': return 'Moderate 💧🔥';
      case 'High': return 'High 🔥';
      default: return '';
    }
  };


  return (
    <div className="full-page-container">
      <div className="exercise-page">

        <div className="exercise-list-container">
          <div className="title-container">
            <p className="title-exercise-list">My Exercises</p>
            <button className="reset-add-exercise-button" onClick={resetFormToAddMode}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <div className="exercise-list">
            {exercises && Object.values(exercises).map((exercise) => (
              <div key={exercise.id} className="exercise-entry">
                <span>{formatDate(exercise.date)}</span>
                <span>{exercise.exercise_type}</span>
                <span>
                  Duration: {exercise.duration} {exercise.duration === 1 ? 'minute' : 'minutes'}
                </span>
                <span>Intensity: {getIntensityEmoji(exercise.intensity)}</span>
                <button className="view-button" onClick={() => handleViewDetails(exercise.id)}>
                  <FontAwesomeIcon icon={faEye} style={{color: "#181d25"}} />
                </button>
                <button className="delete-button" onClick={() => handleRemoveExercise(exercise.id)}>
                  <FontAwesomeIcon icon={faTrashCan} style={{color: "#181d25"}} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="exercise-input-container">
        {isEditing ? <p>Edit Your Workout!</p> : <p>Add Your Workout!</p>}
          <div className="input-field input-field-date">
            <label htmlFor="dateInput">Date</label>
            <input type="date" value={date} onChange={handleDateChange} readOnly={isEditing} />
            {errors.date && <div className="error-message">{errors.date}</div>}
          </div>

          <div className="input-field input-field-type">
            <label htmlFor="exerciseTypeInput">Exercise Type</label>
            <input type="text" placeholder="Exercise Type" value={exerciseType} onChange={handleExerciseTypeChange} />
            {errors.exerciseType && <div className="error-message">{errors.exerciseType}</div>}
          </div>

          <div className="input-field input-field-duration">
            <label htmlFor="durationInput">Duration (min)</label>
            <input type="text" placeholder="Duration (min)" value={duration} onChange={handleDurationChange} />
            {errors.duration && <div className="error-message">{errors.duration}</div>}
          </div>

          <div className="input-field input-field-intensity">
            <label htmlFor="intensityInput">Intensity</label>
            <select value={intensity} onChange={handleIntensityChange} defaultValue="">
              <option value="" disabled>Select Intensity</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
            {errors.intensity && <div className="error-message">{errors.intensity}</div>}
          </div>

          <div className="submit-button-container">
                <button
                className="save-exercise-button"
                onClick={handleSaveExercise}
                disabled={
                  !date ||
                  exerciseType.length < 4 ||
                  isNaN(duration) ||
                  duration <= 0 ||
                  !intensity ||
                  isSubmitted
                }
              >
                {isEditing ? 'Save Changes' : 'Add Exercise'}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
