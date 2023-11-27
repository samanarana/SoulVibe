import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStressesThunk } from '../../store/stress';
import './StressSection.css';

function StressRelief() {
  const dispatch = useDispatch();
  const stresses = useSelector(state => Object.values(state.stress.stresses));

  useEffect(() => {
    dispatch(fetchStressesThunk());
  }, [dispatch]);

  const calculateStressLevel = (stressData) => {
        const relationshipValues = {
            "Amazing": 10, "Supportive": 9, "Stable": 8, "Improving": 6, "Strained": 5,
            "Stressful": 4, "Conflictual": 2, "Distant": 3, "Nonexistent": 0
        };

        const symptomValues = {
            "None": 10, "Headaches": 6, "Fatigue": 7, "Muscle Tension": 5,
            "Digestive Issues": 4, "Sleep Disturbances": 3, "Other": 0
        };

        const exerciseValues = {
            "Daily": 10, "2-3 times a week": 8, "Once a week": 6,
            "2-3 times a month": 4, "Rarely": 2, "Never": 0
        };

        const nutritionValues = {
            "Balanced Diet": 10, "Home Cooked Meals": 9, "Fast Food Oriented": 3,
            "Irregular Meals": 4, "Vegetarian": 8, "Vegan": 8, "Low Carb": 7, "High Protein": 7
        };

        let totalScore = 0;
        let count = 0;

        if (relationshipValues[stressData.personal_relationships] !== undefined) {
            totalScore += relationshipValues[stressData.personal_relationships];
            count++;
        }

        if (stressData.physical_symptoms !== 'Other' && symptomValues[stressData.physical_symptoms] !== undefined) {
            totalScore += symptomValues[stressData.physical_symptoms];
            count++;
        }

        if (exerciseValues[stressData.exercise_frequency] !== undefined) {
            totalScore += exerciseValues[stressData.exercise_frequency];
            count++;
        }

        if (nutritionValues[stressData.nutrition_habits] !== undefined) {
            totalScore += nutritionValues[stressData.nutrition_habits];
            count++;
        }

        if (!isNaN(stressData.stress_level) && stressData.stress_level !== '') {
            totalScore += parseInt(stressData.stress_level, 10);
            count++;
        }

        return count > 0 ? totalScore / count : 0;
    };

    // Calculate the average of all stress levels
    const averageStress = stresses.reduce((acc, stressData) => acc + calculateStressLevel(stressData), 0) / (stresses.length || 1);

    const renderResourcesBasedOnStress = () => {
        if (averageStress >= 7) {
          return (
            <div>
              <p>Looks like your stress is high today. How about you write a journal entry to get stuff off your mind?</p>
              <Link to="/journal">
                <button>JOURNAL</button>
              </Link>
            </div>
          );
        } else if (averageStress >= 4) {
          return (
            <div>
              <p>Your stress is moderate. A balanced diet might help. Check out some nutritious options!</p>
              <Link to="/nutrition">
                <button>NUTRITION</button>
              </Link>
            </div>
          );
        } else {
          return (
            <div>
              <p>Looks like your stress is low today. How about you continue that and go have a great workout? Log it here:</p>
              <Link to="/exercise">
                <button>EXERCISE</button>
              </Link>
            </div>
          );
        }
      };

    return (
    <div className="stress-relief">
        {renderResourcesBasedOnStress()}
    </div>
    );
}


export default StressRelief;
