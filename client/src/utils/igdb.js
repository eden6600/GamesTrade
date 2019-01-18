import axios from 'axios';

const key = '39f720d8cbcb37dcf37364660ce624ba';

export const searchGame = (text, platform) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/api-endpoint.igdb.com/games/?search=${text}&filter[category][eq]=0&filter[platforms][eq]=${platform}&limit=5`,
        {
          headers: {
            'user-key': key,
            Accept: 'application/json'
          }
        }
      )
      .then(res => {
        const idsString = res.data.map(id => id['id']).join();

        axios
          .get(
            `https://cors-anywhere.herokuapp.com/api-endpoint.igdb.com/games/${idsString}`,
            {
              headers: {
                'user-key': key,
                Accept: 'application/json'
              }
            }
          )
          .then(res => {
            resolve({ data: res.data });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getGameById = ids => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/api-endpoint.igdb.com/games/${ids}`,
        {
          headers: {
            'user-key': key,
            Accept: 'application/json'
          }
        }
      )
      .then(res => resolve({ data: res.data }))
      .catch(err => reject(err));
  });
};
