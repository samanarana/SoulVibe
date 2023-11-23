// constants
const VIEW_SLEEPS = "sleep/VIEW_SLEEPS";
const ADD_SLEEP = "sleep/ADD_SLEEP";
const UPDATE_SLEEP = "sleep/UPDATE_SLEEP";
const REMOVE_SLEEP = "sleep/REMOVE_SLEEP";

// actions
const viewSleeps = (sleeps) => ({
    type: VIEW_SLEEPS,
    payload: sleeps,
  });

  const addSleep = (sleep) => ({
    type: ADD_SLEEP,
    payload: sleep,
  });

  const updateSleep = (sleep) => ({
    type: UPDATE_SLEEP,
    payload: sleep,
  });

  const removeSleep = (sleepId) => ({
    type: REMOVE_SLEEP,
    payload: sleepId,
  });


// initial state
const initialState = {
    sleeps: {},
  };

// thunks
export const fetchSleepsThunk = () => async (dispatch) => {
    const response = await fetch("/api/sleep/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      const sleepsObject = data.sleep.reduce((obj, sleep) => {
        obj[sleep.id] = sleep;
        return obj;
      }, {});
      dispatch(viewSleeps(sleepsObject));
    }
  };

  export const createSleepThunk = (sleepData) => async (dispatch) => {
    const response = await fetch("/api/sleep/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sleepData),
    });
    if (response.ok) {
      const sleep = await response.json();
      dispatch(addSleep(sleep));
    }
  };

  export const editSleepThunk = (id, sleepData) => async (dispatch) => {
    const response = await fetch(`/api/sleep/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sleepData),
    });
    if (response.ok) {
      const updatedSleep = await response.json();
      dispatch(updateSleep(updatedSleep));
    }
  };

  export const deleteSleepThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/sleep/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(removeSleep(id));
    }
  };

// reducer
export default function sleepReducer(state = initialState, action) {
    switch (action.type) {
      case VIEW_SLEEPS:
        return {
          ...state,
          sleeps: action.payload,
        };
      case ADD_SLEEP:
        return {
          ...state,
          sleeps: { ...state.sleeps, [action.payload.id]: action.payload },
        };
      case UPDATE_SLEEP:
        return {
          ...state,
          sleeps: { ...state.sleeps, [action.payload.id]: action.payload },
        };
      case REMOVE_SLEEP:
        const newSleeps = { ...state.sleeps };
        delete newSleeps[action.payload];
        return {
          ...state,
          sleeps: newSleeps,
        };
      default:
        return state;
    }
  }
