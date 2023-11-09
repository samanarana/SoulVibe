// constants
const VIEW_MEDITATIONS = "meditation/VIEW_MEDITATIONS";
const ADD_MEDITATION = "meditation/ADD_MEDITATION";
const UPDATE_MEDITATION = "meditation/UPDATE_MEDITATION";
const REMOVE_MEDITATION = "meditation/REMOVE_MEDITATION";

// actions
const viewMeditations = (meditations) => ({
  type: VIEW_MEDITATIONS,
  payload: meditations,
});

const addMeditation = (meditation) => ({
  type: ADD_MEDITATION,
  payload: meditation,
});

const updateMeditation = (meditation) => ({
  type: UPDATE_MEDITATION,
  payload: meditation,
});

const removeMeditation = (meditationId) => ({
  type: REMOVE_MEDITATION,
  payload: meditationId,
});

// initial state
const initialState = {
  meditations: {},
};

// thunks
export const fetchMeditationsThunk = () => async (dispatch) => {
  const response = await fetch("/api/meditation/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    const meditationsObject = data.meditation.reduce((obj, meditation) => {
      obj[meditation.id] = meditation;
      return obj;
    }, {});
    dispatch(viewMeditations(meditationsObject));
  }
};

export const createMeditationThunk = (meditationData) => async (dispatch) => {
  const response = await fetch("/api/meditation/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meditationData),
  });
  if (response.ok) {
    const meditation = await response.json();
    dispatch(addMeditation(meditation));
  }
};

export const editMeditationThunk = (id, meditationData) => async (dispatch) => {
  const response = await fetch(`/api/meditation/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meditationData),
  });
  if (response.ok) {
    const updatedMeditation = await response.json();
    dispatch(updateMeditation(updatedMeditation));
  }
};

export const deleteMeditationThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/meditation/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(removeMeditation(id));
  }
};

// reducer
export default function meditationReducer(state = initialState, action) {
  switch (action.type) {
    case VIEW_MEDITATIONS:
      return {
        ...state,
        meditations: action.payload,
      };
    case ADD_MEDITATION:
      return {
        ...state,
        meditations: { ...state.meditations, [action.payload.id]: action.payload },
      };
    case UPDATE_MEDITATION:
      return {
        ...state,
        meditations: { ...state.meditations, [action.payload.id]: action.payload },
      };
    case REMOVE_MEDITATION:
      const newMeditations = { ...state.meditations };
      delete newMeditations[action.payload];
      return {
        ...state,
        meditations: newMeditations,
      };
    default:
      return state;
  }
}
