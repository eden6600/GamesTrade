import axios from 'axios';

import {
  GET_ERRORS,
  MESSAGES_LOADING,
  GET_MESSAGES,
  GET_MESSAGE,
  SEND_MESSAGE
} from './types';

// Set messages loading
export const setMessagesLoading = () => {
  return {
    type: MESSAGES_LOADING
  };
};

// Get all messages
export const getMessages = () => dispatch => {
  dispatch(setMessagesLoading());
  axios
    .get('/api/messages')
    .then(res =>
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get specific message
export const getMessage = id => dispatch => {
  dispatch(setMessagesLoading());
  axios
    .get(`/api/messages/${id}`)
    .then(res => {
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Send new message
export const sendMessage = message => dispath => {
  axios
    .post('/api/messages', message)
    .then(res => dispath(getMessages()))
    .catch(err =>
      dispath({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Send new reply
export const sendReply = (msgID, reply) => dispatch => {
  axios
    .post(`/api/messages/${msgID}`, reply)
    .then(res =>
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Delete reply
export const deleteReply = (msgID, replyID) => dispatch => {
  axios
    .delete(`/api/messages/${msgID}/${replyID}`)
    .then(res =>
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
