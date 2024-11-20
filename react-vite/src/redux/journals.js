// Action Types
const GET_JOURNALS = 'journals/getJournals';
const CREATE_JOURNAL = 'journals/createJournal';
const UPDATE_JOURNAL = 'journals/updateJournal';
const DELETE_JOURNAL = 'journals/deleteJournal';
const GET_JOURNAL_DETAILS = 'journals/getJournalDetails';

// Action Creators
const getJournals = (journals) => ({
  type: GET_JOURNALS,
  payload: journals,
});

const getJournalDetails = (journal) => ({
  type: GET_JOURNAL_DETAILS,
  payload: journal,
});

const createJournal = (journal) => ({
  type: CREATE_JOURNAL,
  payload: journal,
});

const updateJournal = (journal) => ({
  type: UPDATE_JOURNAL,
  payload: journal,
});

const deleteJournal = (journalId) => ({
  type: DELETE_JOURNAL,
  payload: journalId,
});

// Thunks

// Fetch all journals for the current user
export const thunkFetchJournals = () => async (dispatch) => {
  const response = await fetch('/api/journals');
  if (response.ok) {
    const journals = await response.json();
    dispatch(getJournals(journals));
  } else {
    console.error('Failed to fetch journals:', response.status);
  }
};

// Fetch details of a specific journal
export const thunkFetchJournalDetails = (journalId) => async (dispatch) => {
  const response = await fetch(`/api/journals/${journalId}`);
  if (response.ok) {
    const journal = await response.json();
    dispatch(getJournalDetails(journal));
  } else {
    console.error('Failed to fetch journal details:', response.status);
  }
};

// Create a new journal entry
export const thunkCreateJournal = (newJournal) => async (dispatch) => {
  const response = await fetch('/api/journals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newJournal),
  });

  if (response.ok) {
    const createdJournal = await response.json();
    dispatch(createJournal(createdJournal));
  } else {
    console.error('Failed to create journal:', response.status);
  }
};

// Update an existing journal entry
export const thunkUpdateJournal = (journalId, updatedJournal) => async (dispatch) => {
  const response = await fetch(`/api/journals/${journalId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedJournal),
  });

  if (response.ok) {
    const journal = await response.json();
    dispatch(updateJournal(journal));
  } else {
    console.error('Failed to update journal:', response.status);
  }
};

// Delete a journal entry
export const thunkDeleteJournal = (journalId) => async (dispatch) => {
  const response = await fetch(`/api/journals/${journalId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteJournal(journalId));
  } else {
    console.error('Failed to delete journal:', response.status);
  }
};

// Initial State
const initialState = {
  journals: [],
  currentJournal: null,
};

// Reducer
const journalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOURNALS:
      return { ...state, journals: action.payload };
    case GET_JOURNAL_DETAILS:
      return { ...state, currentJournal: action.payload };
    case CREATE_JOURNAL:
      return { ...state, journals: [...state.journals, action.payload] };
    case UPDATE_JOURNAL:
      return {
        ...state,
        journals: state.journals.map((journal) =>
          journal.id === action.payload.id ? action.payload : journal
        ),
        currentJournal:
          state.currentJournal?.id === action.payload.id
            ? action.payload
            : state.currentJournal,
      };
    case DELETE_JOURNAL:
      return {
        ...state,
        journals: state.journals.filter((journal) => journal.id !== action.payload),
        currentJournal:
          state.currentJournal?.id === action.payload ? null : state.currentJournal,
      };
    default:
      return state;
  }
};

export default journalsReducer;
