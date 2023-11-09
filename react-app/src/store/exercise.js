// constants
const VIEW_EXERCISES = "exercise/VIEW_EXERCISES";
const ADD_EXERCISE = "exercise/ADD_EXERCISE";
const UPDATE_EXERCISE = "exercise/UPDATE_EXERCISE";
const REMOVE_EXERCISE = "exercise/REMOVE_EXERCISE";

// actions
const viewExercises = (exercises) => ({
    type: VIEW_EXERCISES,
    payload: exercises,
  });

const addExercise = (exercise) => ({
  type: ADD_EXERCISE,
  payload: exercise,
});

const updateExercise = (exercise) => ({
  type: UPDATE_EXERCISE,
  payload: exercise,
});

const removeExercise = (exerciseId) => ({
  type: REMOVE_EXERCISE,
  payload: exerciseId,
});


// thunks
export const fetchExercisesThunk = () => async (dispatch) => {
  const response = await fetch("/api/exercises/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    const exercisesObject = data.exercise.reduce((obj, exercise) => {
      obj[exercise.id] = exercise;
      return obj;
    }, {});
    dispatch(viewExercises(exercisesObject));
  }
};

export const createExerciseThunk = (exerciseData) => async (dispatch) => {
  const response = await fetch("/api/exercises/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exerciseData),
  });
  if (response.ok) {
    const exercise = await response.json();
    dispatch(addExercise(exercise));
  }
};

export const editExerciseThunk = (id, exerciseData) => async (dispatch) => {
  const response = await fetch(`/api/exercises/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exerciseData),
  });
  if (response.ok) {
    const updatedExercise = await response.json();
    dispatch(updateExercise(updatedExercise));
  }
};

export const deleteExerciseThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/exercises/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(removeExercise(id));
  }
};

// initial state
const initialState = {
  exercises: {},
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: { ...state.exercises, [action.payload.id]: action.payload },
      };
    case VIEW_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
      };
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: { ...state.exercises, [action.payload.id]: action.payload },
      };
    case REMOVE_EXERCISE:
      const newExercises = { ...state.exercises };
      delete newExercises[action.payload];
      return {
        ...state,
        exercises: newExercises,
      };
    default:
      return state;
  }
}
