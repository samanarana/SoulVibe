import React, { useState, useEffect } from 'react';
import './EditMealModal.css';

function EditMealModal({ mealData, onUpdateMeal, onClose }) {
  const mealTypeOptions = ["breakfast", "lunch", "snack", "dinner", "dessert"];
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
    updatedItems[index][field] = value;
    setMealItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMealData = { mealType, items: mealItems };
    onUpdateMeal(updatedMealData);
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
                </div>
            ))}
          </div>
            <div className="button-container">
                <button type="submit">UPDATE MEAL</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default EditMealModal;
