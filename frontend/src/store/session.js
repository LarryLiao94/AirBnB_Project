import { csrfFetch } from "./csrf";
import { Redirect } from "react-router-dom";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const initialState = { user: null };

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { email, username, password, firstName, lastName } = user;
  const response = await csrfFetch("/api/create-user", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
      firstName,
      lastName,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  }
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  // <Redirect to='/' />
  return response;
};

const sessionReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
