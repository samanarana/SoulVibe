import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStressesThunk } from '../../store/stress';
import './StressSection.css';

function BatteryStress() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStressesThunk());
    }, [dispatch]);

    const stresses = useSelector(state => Object.values(state.stress.stresses));

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

    // Determine the color of the bars based on the average stress level
    const getBarColorClass = (average) => {
        if (average >= 7) {
            return 'green-bar';
        } else if (average >= 4) {
            return 'yellow-bar';
        } else {
            return 'red-bar';
        }
    };

    const barColorClass = getBarColorClass(averageStress);

    // Calculate the number of filled bars based on the stress level
    const barsCount = 10;
    const filledBars = Math.round((10 - averageStress) * (barsCount / 10));

    // Bars for the battery
    const bars = [...Array(barsCount)].map((e, i) => (
        <div key={i} className={`battery-bar ${i < filledBars ? 'filled ' + barColorClass : ''}`}></div>
    ));

    return (
        <div className="battery-container">
            <div className="battery">
                {bars}
                <div className="battery-cap"></div>
            </div>
            <div className="battery-label">Your stress level - {averageStress.toFixed(1)} / 10</div>
        </div>
    );
}

export default BatteryStress;
