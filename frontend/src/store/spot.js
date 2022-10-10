import { csrfFetch } from "./csrf";

export const GET_SPOTS = "spots/GET";
export const GET_SPOT_BY_ID = "spots/GET_ID";
export const GET_USER_SPOTS = "spots/GET_BY_USER";
export const ADD_SPOT = "spots/ADD";
export const DELETE_SPOT = "spots/DELETE";
export const EDIT_SPOT = "spots/EDIT";

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    payload: spots,
  };
};

const getSpotsByID = (spots) => {
  return {
    type: GET_SPOT_BY_ID,
    spots,
  };
};

const getUserSpots = (userSpots) => {
  return {
    type: GET_USER_SPOTS,
    userSpots,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

export const allSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots`);
  const data = await res.json();

  // console.log(data + 'store spot data')

  // if (res.ok) {
  //   dispatch(getSpots(data));
  // } else {
  //   throw res;
  // }
  let allSpots = {};
  data.Spots.forEach((spot) => {
    allSpots[spot.id] = spot;
  })
  dispatch(getSpots(allSpots));
  return res;
};

export const getSelectedSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getSpotsByID(data));
  } else {
    throw res;
  }
  return res;
};

export const currentUserSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/profile/spots`);
  const data = await res.json();
  let userSpots = {};
  data.Spots.forEach((spot) => {
    userSpots[spot.id] = spot;
  })
  if (res.ok) {
    dispatch(getUserSpots(userSpots));
  } else {
    throw res;
  }
  return res;
};

export const updateSpot = (spotId, spotData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spotData),
  });

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(editSpot(updatedSpot));
  }
  return res;
};

export const deleteSpotByID = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteSpot(spotId));
  }
  return res;
};

export const createSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });
  if (res.ok) {
    const newSpot = await res.json();
    dispatch(addSpot(newSpot));
  }
  return res;
};

const initialState = {
  spots: {}
};

const spotsReducer = (state = initialState, action) => {
  let newState = { ...initialState };
  switch (action.type) {
    case GET_SPOTS:
      // newState = { ...state, spots: action.payload};
      newState = { ...state };
      newState.spots = action.payload
      return newState;
    case GET_SPOT_BY_ID:
      newState = { ...state };
      newState.current = action.spots;
      return newState;
    case GET_USER_SPOTS:
      newState = { ...state };
      newState.userSpots = action.userSpots;
      return newState;
    case ADD_SPOT:
      newState = { ...state };
      newState.spots[action.spot.id] = action.spot;
      return newState;
    case EDIT_SPOT:
      newState = { ...state };
      newState.spots[action.spot.id] = action.spot;
      return newState;
    case DELETE_SPOT:
      newState = { ...state };
      delete newState.spots[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
