import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';

import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(user => history.push('/profile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Sign In User
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      // Set token to auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push('/home');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Sign out user
export const logoutUser = () => dispatch => {
  // Remove token from localstorage
  localStorage.removeItem('jwtToken');

  // Remove auth header
  setAuthToken(false);

  // Set current user to {} which will set isAuth false
  dispatch(setCurrentUser({}));
};
