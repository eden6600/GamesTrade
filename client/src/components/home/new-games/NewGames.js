import React, { Component } from 'react';
import NewGameItem from './NewGameItem';

class NewGames extends Component {
  render() {
    return this.props.games.map(item => (
      <div className="col-sm-6 col-md-3" key={item._id}>
        <NewGameItem game={item} />
      </div>
    ));
  }
}

export default NewGames;
