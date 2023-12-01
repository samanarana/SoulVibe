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

   // Define the resources
   const resources = {
    high: [
      { description: 'Looks like your stress is high today. Try journaling to clear your mind.', buttonText: 'Write in Journal', link: '/journal' },
      { description: 'High stress levels can be managed with good nutrition. Explore some healthy options.', buttonText: 'Find Nutritious Foods', link: '/nutrition' },
      { description: 'Exercise can be a great way to relieve stress. How about a workout?', buttonText: 'Plan a Workout', link: '/exercise' }
    ],
    moderate: [
      { description: 'Your stress is moderate. A well-planned meal might help.', buttonText: 'Plan Meals', link: '/nutrition' },
      { description: 'Moderate stress can be alleviated with some journaling.', buttonText: 'Journal Thoughts', link: '/journal' },
      { description: 'A moderate workout can balance your stress. Ready to exercise?', buttonText: 'Start Exercising', link: '/exercise' }
    ],
    low: [
      { description: 'Your stress is low today. Keep it that way with a light workout.', buttonText: 'Do Light Exercise', link: '/exercise' },
      { description: 'Low stress is a perfect time to reflect. How about some journaling?', buttonText: 'Reflect in Journal', link: '/journal' },
      { description: 'Maintain your low stress with good nutrition.', buttonText: 'Explore Healthy Recipes', link: '/nutrition' }
    ]
  };

  // Function to get a random suggestion
  const getRandomSuggestion = (suggestions) => {
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  const renderResourcesBasedOnStress = () => {
    let stressLevel;

    if (averageStress >= 7) {
      stressLevel = 'high';
    } else if (averageStress >= 4) {
      stressLevel = 'moderate';
    } else {
      stressLevel = 'low';
    }

    const suggestion = getRandomSuggestion(resources[stressLevel]);

    return (
      <div className="suggestion-container">
        <p>{suggestion.description}</p>
        <Link to={suggestion.link}>
          <button>{suggestion.buttonText}</button>
        </Link>
      </div>
    );
  };

  return (
    <div className="stress-relief">
      {renderResourcesBasedOnStress()}
    </div>
  );
}

export default StressRelief;
