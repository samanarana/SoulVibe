// constants
const VIEW_STRESSES = "stress/VIEW_STRESSES";
const ADD_STRESS = "stress/ADD_STRESS";
const UPDATE_STRESS = "stress/UPDATE_STRESS";
const REMOVE_STRESS = "stress/REMOVE_STRESS";

// actions
const viewStresses = (stresses) => ({
    type: VIEW_STRESSES,
    payload: stresses,
  });

  const addStress = (stress) => ({
    type: ADD_STRESS,
    payload: stress,
  });

  const updateStress = (stress) => ({
    type: UPDATE_STRESS,
    payload: stress,
  });

  const removeStress = (stressId) => ({
    type: REMOVE_STRESS,
    payload: stressId,
  });

// initial state
const initialState = {
    stresses: {},
  };

// thunks
export const fetchStressesThunk = () => async (dispatch) => {
    const response = await fetch("/api/stress/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      const stressesObject = data.stress.reduce((obj, stress) => {
        obj[stress.id] = stress;
        return obj;
      }, {});
      dispatch(viewStresses(stressesObject));
    }
  };

  export const createStressThunk = (stressData) => async (dispatch) => {
    const response = await fetch("/api/stress/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stressData),
    });
    if (response.ok) {
      const stress = await response.json();
      dispatch(addStress(stress));
    }
  };

  export const editStressThunk = (id, stressData) => async (dispatch) => {
    const response = await fetch(`/api/stress/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stressData),
    });
    if (response.ok) {
      const updatedStress = await response.json();
      dispatch(updateStress(updatedStress));
    }
  };

  export const deleteStressThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/stress/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(removeStress(id));
    }
  };

// reducer
export default function stressReducer(state = initialState, action) {
    switch (action.type) {
      case VIEW_STRESSES:
        return {
          ...state,
          stresses: action.payload,
        };
      case ADD_STRESS:
        return {
          ...state,
          stresses: { ...state.stresses, [action.payload.id]: action.payload },
        };
      case UPDATE_STRESS:
        return {
          ...state,
          stresses: { ...state.stresses, [action.payload.id]: action.payload },
        };
      case REMOVE_STRESS:
        const newStresses = { ...state.stresses };
        delete newStresses[action.payload];
        return {
          ...state,
          stresses: newStresses,
        };
      default:
        return state;
    }
  }
