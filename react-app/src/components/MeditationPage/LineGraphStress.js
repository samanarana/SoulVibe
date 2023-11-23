import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import { fetchStressesThunk } from './../../store/stress';

function LineGraphStress () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStressesThunk());
    }, [dispatch]);

    const stresses = useSelector(state => Object.values(state.stress.stresses));

    const calculateStressNumber = (stressData) => {
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

        // Calculate the average score from the selected options
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

        // Include stress level in the calculation if it is a valid number
        if (!isNaN(stressData.stress_level) && stressData.stress_level !== '') {
        totalScore += parseInt(stressData.stress_level, 10);
        count++;
        }

        return count > 0 ? totalScore / count : 0;
    };

    // Calculate two weeks ago date
    const twoWeeksAgo = moment().subtract(2, 'weeks');

    // Filter stresses to only include those from the last two weeks
    const recentStresses = stresses.filter(stressData =>
        moment(stressData.date).isSameOrAfter(twoWeeksAgo)
    );

    // Map these filtered entries to chartData
    const chartData = recentStresses.map(stressData => ({
        week: moment(stressData.date).format('MM/DD'),
        'Stress Rating': calculateStressNumber(stressData)
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: 'white',
                    padding: '5px',
                    fontSize: '10px'
                }}>
                    <p style={{ margin: '0' }}>{label}</p>
                    <p style={{ margin: '0' }}>{`Stress Rating: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <LineChart width={380} height={200} data={chartData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week"
                    tick={{ fontSize: 10 }}
                    interval={0} />
            <YAxis domain={[0, 10]}
                    tick={{ fontSize: 10 }}
                    width={30} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="Stress Rating" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
}

export default LineGraphStress;
