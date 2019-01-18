import {
  GET_USER_GAMES,
  GET_MATCHES,
  GAME_LOADING,
  GET_GAME,
  GET_ALL_GAMES,
  GET_ALL_PLATFORM_GAMES
} from '../actions/types';

const initialState = {
  userGames: null,
  game: null,
  allGames: null,
  matches: null,
  allPlatformGames: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GAME_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER_GAMES:
      return {
        ...state,
        userGames: action.payload,
        loading: false
      };
    case GET_GAME:
      return {
        ...state,
        game: action.payload,
        loading: false
      };
    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        loading: false
      };
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload
      };
    case GET_ALL_PLATFORM_GAMES:
      return {
        ...state,
        allPlatformGames: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
