import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Games extends Component {
  render() {
    return (
      <div className="card card-body">
        <h4 className="card-title">User Games</h4>
        <ul className="list-group-flush pl-0">
          {this.props.data.map(game => (
            <Link to={`/game/${game._id}`}>
              <li className="list-group-item pl-0">
                <img src={game.image} className="cover-small mr-2" alt="" />
                <span>{game.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

Games.propTypes = {
  data: PropTypes.array.isRequired
};

export default Games;
