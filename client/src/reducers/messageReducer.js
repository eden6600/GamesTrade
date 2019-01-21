import {
  MESSAGES_LOADING,
  GET_MESSAGES,
  GET_MESSAGE,
  SEND_MESSAGE
} from '../actions/types';

const initialState = {
  loading: false,
  messages: [],
  message: {},
  messageSent: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: action.payload
      };
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messageSent: !state.messageSent
      };
    default:
      return state;
  }
}
