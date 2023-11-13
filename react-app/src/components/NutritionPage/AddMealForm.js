import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNutritionThunk } from '../../store/nutrition';
import './AddMealForm.css'

import breakfastIcon from './Icons/breakfast.png';
import lunchIcon from './Icons/lunch.png';
import dinnerIcon from './Icons/dinner.png';
import snackIcon from './Icons/snack.png';

import fruitsIcon from './CategoryImage/fruits.png';
import veggiesIcon from './CategoryImage/veggies.png';
import proteinIcon from './CategoryImage/protein.png';
import breadIcon from './CategoryImage/bread.png';
import dairyIcon from './CategoryImage/dairy.png';
import dessertIcon from './CategoryImage/dessert.png';
import drinksIcon from './CategoryImage/drinkss.png';

const initialNutritionDetail = {
  category_id: '',
  description: '',
  amount: '',
};

function AddMealForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [mealDate, setMealDate] = useState(new Date().toISOString().split('T')[0]);
  const [mealType, setMealType] = useState("");
  const [nutritionDetails, setNutritionDetails] = useState([initialNutritionDetail]);
  const [foodEntries, setFoodEntries] = useState([]);

  const addNutritionDetail = () => {
    if (nutritionDetails[0].description && nutritionDetails[0].amount) {
        setFoodEntries(prevEntries => [...prevEntries, nutritionDetails[0]]);
        setNutritionDetails([{ category_id: '', description: '', amount: '' }]);
    } else {
        console.log("Current nutrition details are incomplete.");
    }
  };

  const handleNutritionDetailChange = (index, field, value) => {
    const newDetails = [...nutritionDetails];
    newDetails[index][field] = value;
    setNutritionDetails(newDetails);
  };

  const handleCategoryChange = (index, categoryId) => {
    const newDetails = [...nutritionDetails];
    newDetails[index].category_id = categoryId;
    setNutritionDetails(newDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedEntries = [...foodEntries];

    // Add the current nutrition detail if it's filled
    if (nutritionDetails[0].description && nutritionDetails[0].amount) {
        combinedEntries.push(nutritionDetails[0]);
    }

    const formData = {
        date: mealDate,
        meal_type: mealType,
        nutrition_details: combinedEntries,
        userId: sessionUser.id,
    };

    // Dispatch the thunk action
    dispatch(createNutritionThunk(formData));

    // Reset the form immediately after dispatch
    resetForm();
  };

  const resetForm = () => {
      setMealDate(new Date().toISOString().split('T')[0]);
      setMealType("");
      setNutritionDetails([{ category_id: '', description: '', amount: '' }]);
      setFoodEntries([]);
  };




  // Function to return the correct icon based on the category
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'fruits': return fruitsIcon;
      case 'vegetables': return veggiesIcon;
      case 'proteins': return proteinIcon;
      case 'grains': return breadIcon;
      case 'dairy': return dairyIcon;
      case 'dessert': return dessertIcon;
      case 'drinks': return drinksIcon;
      default: return '';
    }
  };


  return (
    <div className="add-meal-form-container">

        <form id="add-meal-form" onSubmit={handleSubmit} onReset={resetForm}>
            <div className="date-title-container">
              <p className="title-meal-form">Add a Meal!</p>
              <label htmlFor="meal-date"></label>
              <input
              className="meal-date"
              type="date"
              id="meal-date"
              name="date"
              value={mealDate}
              onChange={(e) => setMealDate(e.target.value)}
              required
              />
            </div>

            <div className="meal-type-selection">
              <p className="meal-label">Choose Your Feast:</p>
              <div className="meal-type-specific">
                  <div className="meal-type-item">
                    <img
                      src={breakfastIcon}
                      alt="Breakfast"
                      className={mealType === 'breakfast' ? 'meal-type-icon selected' : 'meal-type-icon'}
                      onClick={() => setMealType('breakfast')}
                    />
                    <label className="meal-type-label" onClick={() => setMealType('breakfast')}>Breakfast</label>
                  </div>

                  <div className="meal-type-item">
                    <img
                      src={lunchIcon}
                      alt="Lunch"
                      className={mealType === 'lunch' ? 'meal-type-icon selected' : 'meal-type-icon'}
                      onClick={() => setMealType('lunch')}
                    />
                    <label className="meal-type-label" onClick={() => setMealType('lunch')}>Lunch</label>
                  </div>

                  <div className="meal-type-item">
                    <img
                      src={dinnerIcon}
                      alt="Dinner"
                      className={mealType === 'dinner' ? 'meal-type-icon selected' : 'meal-type-icon'}
                      onClick={() => setMealType('dinner')}
                    />
                    <label className="meal-type-label" onClick={() => setMealType('dinner')}>Dinner</label>
                  </div>

                  <div className="meal-type-item">
                    <img
                      src={snackIcon}
                      alt="Snack"
                      className={mealType === 'snack' ? 'meal-type-icon selected' : 'meal-type-icon'}
                      onClick={() => setMealType('snack')}
                    />
                    <label className="meal-type-label" onClick={() => setMealType('snack')}>Snack</label>
                  </div>
                </div>
              </div>


              <div className="nutrition-details-container">
              {nutritionDetails.map((detail, index) => (
                <div key={index} className="nutrition-details-entry">
                  <div className="food-category-selection">
                    <p className="meal-label">What's In Your Meal?</p>
                    <div className="food-title-container">
                      <div className="food-category-item">
                        <img
                          src={fruitsIcon}
                          alt="Fruits"
                          className={detail.category_id === 'fruits' ? 'category-icon selected' : 'category-icon'}
                          onClick={() => handleCategoryChange(index, 'fruits')}
                        />
                        <span>Fruits</span>
                      </div>
                      <div className="food-category-item">
                        <img
                          src={veggiesIcon}
                          alt="Vegetables"
                          className={detail.category_id === 'vegetables' ? 'category-icon selected' : 'category-icon'}
                          onClick={() => handleCategoryChange(index, 'vegetables')}
                        />
                        <span>Vegetables</span>
                      </div>
                      <div className="food-category-item">
                        <img
                          src={proteinIcon}
                          alt="Protein"
                          className={detail.category_id === 'proteins' ? 'category-icon selected' : 'category-icon'}
                          onClick={() => handleCategoryChange(index, 'proteins')}
                        />
                        <span>Protein</span>
                      </div>
                      <div className="food-category-item">
                        <img
                          src={breadIcon}
                          alt="Bread"
                          className={detail.category_id === 'grains' ? 'category-icon selected' : 'category-icon'}
                          onClick={() => handleCategoryChange(index, 'grains')}
                        />
                        <span>Grains</span>
                      </div>
                      <div className="food-category-item">
                        <img
                          src={dairyIcon}
                          alt="Dairy"
                          className={detail.category_id === 'dairy' ? 'category-icon selected' : 'category-icon'}
                          onClick={() => handleCategoryChange(index, 'dairy')}
                        />
                        <span>Dairy</span>
                      </div>
                      <div className="food-category-item">
                        <img
                          src={dessertIcon}
                          alt="Dessert"
                          className={detail.category_id === 'dessert' ? 'category-icon selected' : 'category-icon'}
                          onClick={() => handleCategoryChange(index, 'dessert')}
                        />
                        <span>Dessert</span>
                      </div>
                      <div className="food-category-item">
                        <img
                          src={drinksIcon}
                          alt="Drinks"
                          className={detail.category_id === 'drinks' ? 'category-icon selected' : 'category-icon'}
                          onClick={() => handleCategoryChange(index, 'drinks')}
                        />
                        <span>Drinks</span>
                      </div>
                    </div>
                  </div>

                  <div className="description-amount-container">
                    <div className="description-section">
                    <label htmlFor={`description-${index}`}>What is it?</label>
                    <input
                        type="text"
                        id={`description-${index}`}
                        name="description"
                        value={detail.description}
                        onChange={(e) => handleNutritionDetailChange(index, 'description', e.target.value)}
                        required
                    />
                    </div>

                    <div className="amount-section">
                    <label htmlFor={`amount-${index}`}>Amount?</label>
                    <input
                        type="text"
                        id={`amount-${index}`}
                        name="amount"
                        value={detail.amount}
                        onChange={(e) => handleNutritionDetailChange(index, 'amount', e.target.value)}
                        required
                    />
                    </div>
                  </div>
                </div>
            ))}
            </div>

            {foodEntries.length > 0 && (
              <div className="food-entries-container">
                  {foodEntries.map((detail, index) => (
                      <div key={index} className="food-entry-bar">
                          <img src={getCategoryIcon(detail.category_id)} alt={detail.category_id} className="food-category-icon" />
                          <span>{detail.description}</span>
                          <span>{detail.amount}</span>
                      </div>
                  ))}
              </div>
            )}

            <div className="buttons-container">
              <button type="button" onClick={addNutritionDetail}>Add More</button>
              <input type="hidden" id="user-id" name="userId" value={sessionUser.id} />
              <button type="submit" onClick={handleSubmit}>Submit</button>
              <button type="reset">Reset</button>
            </div>
        </form>
    </div>
  );
}

export default AddMealForm;