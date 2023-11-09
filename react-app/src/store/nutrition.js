// constants
const GET_NUTRITIONS = "nutrition/GET_NUTRITIONS";
const ADD_NUTRITION = "nutrition/ADD_NUTRITION";
const UPDATE_NUTRITION = "nutrition/UPDATE_NUTRITION";
const DELETE_NUTRITION = "nutrition/DELETE_NUTRITION";

// actions
const getNutritionsAction = (nutritions) => ({
  type: GET_NUTRITIONS,
  payload: nutritions,
});

const addNutritionAction = (nutrition) => ({
  type: ADD_NUTRITION,
  payload: nutrition,
});

const updateNutritionAction = (nutrition) => ({
  type: UPDATE_NUTRITION,
  payload: nutrition,
});

const deleteNutritionAction = (nutritionId) => ({
  type: DELETE_NUTRITION,
  payload: nutritionId,
});

// initial state
const initialState = {
  nutritions: {},
};

// thunks
export const fetchNutritionsThunk = () => async (dispatch) => {
  const response = await fetch("/api/nutrition/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getNutritionsAction(data.nutrition));
  }
};

export const createNutritionThunk = (nutritionData) => async (dispatch) => {
  const response = await fetch("/api/nutrition/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nutritionData),
  });
  if (response.ok) {
    const newNutrition = await response.json();
    dispatch(addNutritionAction(newNutrition));
  }
};

export const updateNutritionThunk = (nutritionId, nutritionData) => async (dispatch) => {
  const response = await fetch(`/api/nutrition/${nutritionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nutritionData),
  });
  if (response.ok) {
    const updatedNutrition = await response.json();
    dispatch(updateNutritionAction(updatedNutrition));
  }
};

export const deleteNutritionThunk = (nutritionId) => async (dispatch) => {
  const response = await fetch(`/api/nutrition/${nutritionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(deleteNutritionAction(nutritionId));
  }
};

// reducer
export default function nutritionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NUTRITIONS:
      return {
        ...state,
        nutritions: { ...state.nutritions, ...action.payload.reduce((obj, item) => ({...obj, [item.id]: item}), {}) },
      };
    case ADD_NUTRITION:
      return {
        ...state,
        nutritions: { ...state.nutritions, [action.payload.id]: action.payload },
      };
    case UPDATE_NUTRITION:
      return {
        ...state,
        nutritions: { ...state.nutritions, [action.payload.id]: action.payload },
      };
    case DELETE_NUTRITION:
      const newNutritions = { ...state.nutritions };
      delete newNutritions[action.payload];
      return {
        ...state,
        nutritions: newNutritions,
      };
    default:
      return state;
  }
}
