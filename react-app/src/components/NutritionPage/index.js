import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNutritionsThunk } from '../../store/nutrition';
import AddMealForm from './AddMealForm';

function NutritionPage() {
  const dispatch = useDispatch();
  const nutritions = useSelector((state) => state.nutrition.nutritions);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    dispatch(fetchNutritionsThunk());
  }, [dispatch]);

  const nutritionsForSelectedDate = Object.values(nutritions).filter(
    (nutrition) => nutrition.date === selectedDate
  );

  const handleDateChange = (offset) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  return (
    <div className="nutrition-page-container">

      <div className="date-cards-container">
          <div className="date-navigator">
            <button onClick={() => handleDateChange(-1)}>&lt;</button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button onClick={() => handleDateChange(1)}>&gt;</button>
          </div>
          <div className="cards-container">
            {nutritionsForSelectedDate.map((nutrition) => (
              <div key={nutrition.id} className="nutrition-card">
                {/* Your card content here */}
                <p>{nutrition.meal_type}</p>
                {/* ... other nutrition details */}
              </div>
            ))}
          </div>
      </div>

        <AddMealForm />

    </div>
  );
};

export default NutritionPage;
