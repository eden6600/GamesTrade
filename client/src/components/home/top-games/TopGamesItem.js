import React, { Component } from 'react';

class TopGamesItem extends Component {
  render() {
    const { game } = this.props;

    return (
      <li className="list-group-item ">
        <img
          src={game.game.image}
          className="cover-small rounded mr-2 animated flipInX"
          alt=""
        />
        <span>{game.game.name}</span>
      </li>
    );
  }
}

export default TopGamesItem;
