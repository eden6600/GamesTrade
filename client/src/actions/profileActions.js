import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from './types';

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//Get Profile
export const getProfile = id => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get(`/api/profiles/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE_BY_ID,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Create/Edit Profile
export const createEditProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profiles', profileData)
    .then(() => {
      if (history) history.push('/dashboard');
      window.alert('Profile Updated');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
