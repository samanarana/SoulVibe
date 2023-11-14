import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNutritionsThunk } from '../../store/nutrition';
import AddMealForm from './AddMealForm';
import './Nutrition.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import breakfastIcon from './Icons/breakfast.png';
import lunchIcon from './Icons/lunch.png';
import dinnerIcon from './Icons/dinner.png';
import snackIcon from './Icons/snack.png';
import dessert2Icon from './Icons/dessert2.png';

function NutritionPage() {

  function getLocalDate() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().split('T')[0];
  }

  const dispatch = useDispatch();
  const nutritions = useSelector((state) => state.nutrition.nutritions);
  const [selectedDate, setSelectedDate] = useState(getLocalDate());
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);


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

  const handleCardClick = (nutritionId) => {
    const mealDetails = nutritions[nutritionId];
    setSelectedMeal(mealDetails);
    setActiveCard(nutritionId);
    setSelectedCardId(nutritionId);
  };

  const getMealIcon = (meal_type) => {
    switch(meal_type) {
      case 'breakfast': return breakfastIcon;
      case 'lunch': return lunchIcon;
      case 'dinner': return dinnerIcon;
      case 'snack': return snackIcon;
      case 'dessert': return dessert2Icon;
      default: return null;
    }
  };

  return (
    <div className="nutrition-page-container">

      <div className="left-side-container">
        <div className="date-cards-container">

          <div className="date-navigator">
            <button onClick={() => handleDateChange(-1)} style={{ border: 'none' }}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button onClick={() => handleDateChange(1)} style={{ border: 'none' }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="cards-container-hello">
            {nutritionsForSelectedDate.length > 0 ? (
              nutritionsForSelectedDate.map((nutrition) => (
                <div
                  key={nutrition.id}
                  className={`nutrition-card ${selectedCardId === nutrition.id ? 'selected-card' : ''}`}
                  onClick={() => handleCardClick(nutrition.id)}
                  style={{ zIndex: activeCard === nutrition.id ? 10 : 1 }}
                >
                  <img className="nutrition-card-icon" src={getMealIcon(nutrition.meal_type)} alt={nutrition.meal_type} />
                </div>
              ))
            ) : (
              <div className="nutrition-card">
                <p>No meals today :(</p>
              </div>
            )}
          </div>

          {selectedMeal && (
            <div className="meal-details-container">
              <div className="meal-detail">
                <p>My {selectedMeal.meal_type} !</p>
                <ul>
                  {selectedMeal.nutrition_details.map(detail => (
                    <li key={detail.id}>
                      {detail.description} - {detail.amount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}


        </div>
      </div>


        <AddMealForm />

    </div>
  );
}

export default NutritionPage;
