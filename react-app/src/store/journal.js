// constants
const VIEW_JOURNALS = "journal/VIEW_JOURNALS";
const ADD_JOURNAL = "journal/ADD_JOURNAL";
const UPDATE_JOURNAL = "journal/UPDATE_JOURNAL";
const REMOVE_JOURNAL = "journal/REMOVE_JOURNAL";

// actions
const viewJournals = (journals) => ({
  type: VIEW_JOURNALS,
  payload: journals,
});

const addJournal = (journal) => ({
  type: ADD_JOURNAL,
  payload: journal,
});

const updateJournal = (journal) => ({
  type: UPDATE_JOURNAL,
  payload: journal,
});

const removeJournal = (journalId) => ({
  type: REMOVE_JOURNAL,
  payload: journalId,
});

// initial state
const initialState = {
  journals: {},
};

// thunks
export const fetchJournalsThunk = () => async (dispatch) => {
  const response = await fetch("/api/journals/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    const journalsObject = data.journals.reduce((obj, journal) => {
      obj[journal.id] = journal;
      return obj;
    }, {});
    dispatch(viewJournals(journalsObject));
  }
};

export const createJournalThunk = (journalData) => async (dispatch) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const dataToSend = {
    ...journalData,
    date: currentDate
  };

  const response = await fetch("/api/journals/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
  if (response.ok) {
    const journal = await response.json();
    dispatch(addJournal(journal));
  }
};

export const editJournalThunk = (id, journalData) => async (dispatch) => {
  const response = await fetch(`/api/journals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journalData),
  });
  if (response.ok) {
    const updatedJournal = await response.json();
    dispatch(updateJournal(updatedJournal));
  }
};

export const deleteJournalThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/journals/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(removeJournal(id));
  }
};

// reducer
export default function journalReducer(state = initialState, action) {
  switch (action.type) {
    case VIEW_JOURNALS:
      return {
        ...state,
        journals: action.payload,
      };
    case ADD_JOURNAL:
      return {
        ...state,
        journals: { ...state.journals, [action.payload.id]: action.payload },
      };
    case UPDATE_JOURNAL:
      return {
        ...state,
        journals: { ...state.journals, [action.payload.id]: action.payload },
      };
    case REMOVE_JOURNAL:
      const newJournals = { ...state.journals };
      delete newJournals[action.payload];
      return {
        ...state,
        journals: newJournals,
      };
    default:
      return state;
  }
}
