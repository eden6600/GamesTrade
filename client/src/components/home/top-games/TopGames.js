import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopGamesItem from './TopGamesItem';

class TopGames extends Component {
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item text-center bg-light">
          {this.props.platform}
        </li>
        {this.props.games.map(item => (
          <TopGamesItem game={item} key={item.game.igdb_id} />
        ))}
      </ul>
    );
  }
}

TopGames.propTypes = {
  games: PropTypes.array.isRequired,
  platform: PropTypes.string.isRequired
};

export default TopGames;
