// Action Types
const GET_GROWTH_TRACKERS = 'growthTracker/getGrowthTrackers';
const CREATE_GROWTH_TRACKER = 'growthTracker/createGrowthTracker';
const UPDATE_GROWTH_TRACKER = 'growthTracker/updateGrowthTracker';
const DELETE_GROWTH_TRACKER = 'growthTracker/deleteGrowthTracker';
const GET_GROWTH_TRACKER_DETAILS = 'growthTracker/getGrowthTrackerDetails';

// Action Creators
const getGrowthTrackers = (trackers) => ({
  type: GET_GROWTH_TRACKERS,
  payload: trackers,
});

const getGrowthTrackerDetails = (tracker) => ({
  type: GET_GROWTH_TRACKER_DETAILS,
  payload: tracker,
});

const createGrowthTracker = (tracker) => ({
  type: CREATE_GROWTH_TRACKER,
  payload: tracker,
});

const updateGrowthTracker = (tracker) => ({
  type: UPDATE_GROWTH_TRACKER,
  payload: tracker,
});

const deleteGrowthTracker = (trackerId) => ({
  type: DELETE_GROWTH_TRACKER,
  payload: trackerId,
});

// Thunks

// Fetch all growth tracker entries for the current user
export const thunkFetchGrowthTrackers = () => async (dispatch) => {
  const response = await fetch('/api/growth-tracker');
  if (response.ok) {
    const trackers = await response.json();
    dispatch(getGrowthTrackers(trackers));
  } else {
    console.error('Failed to fetch growth trackers:', response.status);
  }
};

// Fetch details of a specific growth tracker entry
export const thunkFetchGrowthTrackerDetails = (trackerId) => async (dispatch) => {
  const response = await fetch(`/api/growth-tracker/${trackerId}`);
  if (response.ok) {
    const tracker = await response.json();
    dispatch(getGrowthTrackerDetails(tracker));
  } else {
    console.error('Failed to fetch growth tracker details:', response.status);
  }
};

// Create a new growth tracker entry
export const thunkCreateGrowthTracker = (newTracker) => async (dispatch) => {
  const response = await fetch('/api/growth-tracker', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTracker),
  });

  if (response.ok) {
    const createdTracker = await response.json();
    dispatch(createGrowthTracker(createdTracker));
  } else {
    console.error('Failed to create growth tracker:', response.status);
  }
};

// Update an existing growth tracker entry
export const thunkUpdateGrowthTracker = (trackerId, updatedTracker) => async (dispatch) => {
  const response = await fetch(`/api/growth-tracker/${trackerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTracker),
  });

  if (response.ok) {
    const tracker = await response.json();
    dispatch(updateGrowthTracker(tracker));
  } else {
    console.error('Failed to update growth tracker:', response.status);
  }
};

// Delete a specific growth tracker entry
export const thunkDeleteGrowthTracker = (trackerId) => async (dispatch) => {
  const response = await fetch(`/api/growth-tracker/${trackerId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteGrowthTracker(trackerId));
  } else {
    console.error('Failed to delete growth tracker:', response.status);
  }
};

// Initial State
const initialState = {
  growthTrackers: [],
  currentTracker: null,
};

// Reducer
const growthTrackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROWTH_TRACKERS:
      return { ...state, growthTrackers: action.payload };
    case GET_GROWTH_TRACKER_DETAILS:
      return { ...state, currentTracker: action.payload };
    case CREATE_GROWTH_TRACKER:
      return { ...state, growthTrackers: [...state.growthTrackers, action.payload] };
    case UPDATE_GROWTH_TRACKER:
      return {
        ...state,
        growthTrackers: state.growthTrackers.map((tracker) =>
          tracker.id === action.payload.id ? action.payload : tracker
        ),
        currentTracker:
          state.currentTracker?.id === action.payload.id
            ? action.payload
            : state.currentTracker,
      };
    case DELETE_GROWTH_TRACKER:
      return {
        ...state,
        growthTrackers: state.growthTrackers.filter((tracker) => tracker.id !== action.payload),
        currentTracker:
          state.currentTracker?.id === action.payload ? null : state.currentTracker,
      };
    default:
      return state;
  }
};

export default growthTrackerReducer;
