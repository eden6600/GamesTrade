import axios from 'axios';

import {
  GET_USER_GAMES,
  GAME_LOADING,
  GET_ERRORS,
  GET_GAME,
  GET_ALL_GAMES,
  GET_MATCHES,
  GET_ALL_PLATFORM_GAMES
} from './types';

export const setGamesLoading = () => {
  return {
    type: GAME_LOADING
  };
};

export const getUserGames = () => dispatch => {
  dispatch(setGamesLoading());
  axios
    .get('/api/games')
    .then(res =>
      dispatch({
        type: GET_USER_GAMES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const getUserGamesById = id => dispatch => {
  axios
    .get(`/api/games/user-games/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_GAMES,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const addGame = (game, history) => {
  axios
    .post('/api/games', game)
    .then(() => history.push('/dashboard'))
    .catch(err => console.log(err));
};

export const deleteGame = id => dispatch => {
  axios
    .delete(`/api/games/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER_GAMES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getGame = id => dispatch => {
  dispatch(setGamesLoading());
  axios
    .get(`/api/games/${id}`)
    .then(res =>
      dispatch({
        type: GET_GAME,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getAllGames = () => dispatch => {
  dispatch(setGamesLoading());
  axios
    .get(`/api/games/all`)
    .then(res =>
      dispatch({
        type: GET_ALL_GAMES,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getMatches = (userGames, allGames) => dispatch => {
  const matches = [];

  userGames.forEach(game => {
    game.trade_for.forEach(tradeForGame => {
      allGames.forEach(allGamesItem => {
        if (
          allGamesItem.igdb_id === tradeForGame.igdb_id &&
          allGamesItem.platform === game.platform &&
          allGamesItem.user._id !== game.user._id
        ) {
          const match = {};
          match.offer = game;
          match.demand = allGamesItem;

          matches.push(match);
        }
      });
    });
  });

  dispatch({
    type: GET_MATCHES,
    payload: matches
  });
};

export const getAllPlatformGames = platform => dispatch => {
  dispatch(setGamesLoading());
  axios
    .get(`/api/games/platform/${platform}`)
    .then(res =>
      dispatch({
        type: GET_ALL_PLATFORM_GAMES,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
