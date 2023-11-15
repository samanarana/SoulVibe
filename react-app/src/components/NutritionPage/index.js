import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNutritionsThunk, deleteNutritionThunk } from '../../store/nutrition';
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
  const cardContainerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(getLocalDate());
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);


  useEffect(() => {
    dispatch(fetchNutritionsThunk())
  }, [dispatch]);

  const nutritionsForSelectedDate = Object.values(nutritions).filter(
    (nutrition) => nutrition.date === selectedDate
  );
  console.log('Nutritions for selected date:', nutritionsForSelectedDate);

  const handleDateChange = (offset) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
    setSelectedMeal(null);
    setSelectedCardId(null);
  };

  const handleCardClick = (nutritionId) => {
    const mealDetails = nutritions[nutritionId];
    setSelectedMeal(mealDetails);
    setActiveCard(nutritionId);
    setSelectedCardId(nutritionId);
  };

  const scrollAmount = 100; // Width of card
  const scrollDuration = 300; // Duration of scroll in milliseconds

    const smoothScroll = (scrollBy) => {
      const element = cardContainerRef.current;
      if (!element) return;

      let startTime = null;

      const animateScroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / scrollDuration, 1);

        element.scrollLeft += progress * scrollBy;

        if (timeElapsed < scrollDuration) {
          window.requestAnimationFrame(animateScroll);
        }
      };

      window.requestAnimationFrame(animateScroll);
    };

  const handleLeftClick = () => {
    smoothScroll(-scrollAmount); // Scrolls left
  };

  const handleRightClick = () => {
    smoothScroll(scrollAmount); // Scrolls right
  };

  const handleDeleteSelectedMeal = () => {
    if (selectedCardId) {
      dispatch(deleteNutritionThunk(selectedCardId));
      setSelectedMeal(null);
      setSelectedCardId(null);
    }
  };

  const handleClearAllMeals = () => {
    nutritionsForSelectedDate.forEach(nutrition => {
      dispatch(deleteNutritionThunk(nutrition.id));
    });

    setSelectedMeal(null);
    setSelectedCardId(null);
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


          <div className="cards-navigation">
              <button className="left-arrow" onClick={handleLeftClick}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            <div className="cards-container-hello" ref={cardContainerRef}>
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
                <button className="right-arrow" onClick={handleRightClick}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
          </div>

          {selectedMeal && (
            <div className="meal-details-container">
              <div className="meal-details">
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

          <div className="delete-buttons">
            <button onClick={handleDeleteSelectedMeal}>Delete Meal</button>
            <button onClick={handleClearAllMeals}>Clear All Meals for Today</button>
          </div>

        </div>
      </div>


        <AddMealForm />

    </div>
  );
}

export default NutritionPage;
