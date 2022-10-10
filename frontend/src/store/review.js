import { csrfFetch } from "./csrf";

export const GET_USER_REVIEWS = "reviews/GET_USER";
export const GET_SPOT_REVIEWS = "reviews/GET_SPOT";
export const ADD_REVIEW = "reviews/ADD";
export const REMOVE_REVIEW = "reviews/REMOVE";
export const EDIT_REVIEW = "reviews/EDIT";

const getUserReviews = (reviews) => {
  return {
    type: GET_USER_REVIEWS,
    payload: reviews,
  };
};

const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    payload: reviews,
  };
};

const addNewReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    payload: reviewId,
  };
};

const updateReview = (review) => {
  return {
    type: EDIT_REVIEW,
    payload: review,
  };
};

export const reviewsBySpotID = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}/reviews`);
  const data = await res.json();
  if (res.ok) {
    let allSpotReviews = {};
    data.Reviews.forEach((e) => {
      allSpotReviews[e.id] = e;
    });

    dispatch(getSpotReviews(allSpotReviews));
  }
  return res;
};

export const currentUserReviews = () => async (dispatch) => {
  const res = await csrfFetch(`/api/profile/my-reviews`);
  const data = await res.json();

  let myReviews = {};
  data.Reviews.forEach((e) => {
    myReviews[e.id] = e;
  });

  dispatch(getUserReviews(myReviews));
  return res;
};

export const editReview = (reviewId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify({
      review: review.review,
      stars: review.stars,
    }),
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateReview(updatedReview));
  }
  return res;
};

export const deleteCurrentReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    
    dispatch(deleteReview(reviewId));
  }
  return res;
};

export const createNewReview = (spotId, review) => async (dispatch) => {
  const addReview = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  const newReview = await addReview.json();
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await res.json();
  

  let spotReviews = {};
  reviews.Reviews.forEach((e) => {
    spotReviews[e.id] = e;
  });

  dispatch(addNewReview(spotReviews[newReview.id]));
  
  return res;
};

const initialState = {
  review: null,
};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...initialState };
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      newState = { ...state, review: action.payload };
      return newState;
    case GET_USER_REVIEWS:
      newState = { ...state, review: action.payload };
      return newState;
    case EDIT_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload.review;
      return newState;
    case REMOVE_REVIEW:
      newState = { ...state };
      
      delete newState.review[action.payload];
      
      
      return newState;
    case ADD_REVIEW:
      newState = { ...state };
      
      newState[action.payload.id] = action.payload.review;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
