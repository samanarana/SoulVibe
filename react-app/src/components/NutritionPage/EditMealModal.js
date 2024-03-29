import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { updateNutritionThunk } from '../../store/nutrition';
import './EditMealModal.css';

function EditMealModal({ mealData, onUpdateMeal, onClose }) {
  const dispatch = useDispatch();
  const mealTypeOptions = ["Breakfast", "Lunch", "Snack", "Dinner", "Dessert"];
  const categoryOptions = ["Fruits", "Vegetables", "Proteins", "Grains", "Dairy", "Dessert", "Drinks"];

  const [mealType, setMealType] = useState('');
  const [mealItems, setMealItems] = useState([]);

  useEffect(() => {
    if (mealData) {
      setMealType(mealData.meal_type);
      setMealItems(mealData.nutrition_details);
    }
  }, [mealData]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...mealItems];
    if (field === 'category_id') {
      updatedItems[index].category_id = parseInt(value, 10);
    } else {
      updatedItems[index][field] = value;
    }

    setMealItems(updatedItems);
  };


  const handleAddItem = () => {
    const newItem = {
      amount: '',
      category_id: 1,
      description: '',
      nutrition_id: mealData.nutrition_id,
    };

    setMealItems([...mealItems, newItem]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = mealItems.filter((_, i) => i !== index);
    setMealItems(updatedItems);
  };

  const isSubmitDisabled = mealItems.some(item => !item.description || !item.amount || !item.category_id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItems = mealItems.map(item => ({
      nutrition_id: item.nutrition_id,
      category_id: item.category_id,
      description: item.description,
      amount: item.amount,
    }));

    // Dispatch a single updateNutritionThunk with the updated items
    dispatch(updateNutritionThunk(mealData.id, { nutrition_details: updatedItems }));

    onUpdateMeal({ mealType, items: updatedItems });
  };

  return (
    <div className="edit-meal-modal">
      <div className="modal-content">
        <div className="modal-title-container">
          <h2>Edit Meal</h2>
          <span className="close-button" onClick={onClose}>&times;</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Meal Type:
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
              {mealTypeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <div className="modal-details-container">
            {mealItems.map((item, index) => (
              <div key={index} className="meal-item">
                <label>
                  Category:
                  <select
                    value={item.category_id}
                    onChange={(e) => handleItemChange(index, 'category_id', e.target.value)}
                  >
                    {categoryOptions.map((cat, catIndex) => (
                      <option key={catIndex} value={catIndex + 1}>{cat}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </label>
                <label>
                  Amount:
                  <input
                    type="text"
                    value={item.amount}
                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                  />
                </label>
                <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => handleDeleteItem(index)} />
              </div>
            ))}
          </div>
          <span className="add-item-text" onClick={handleAddItem}>Add an item</span>
          <div className="button-container">
            <button type="submit" disabled={isSubmitDisabled}>UPDATE MEAL</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMealModal;
