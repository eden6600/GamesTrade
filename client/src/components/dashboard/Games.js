import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { deleteGame } from '../../actions/gameActions';

class Games extends Component {
  onClickDelete = id => {
    this.props.deleteGame(id);
  };

  render() {
    const { games } = this.props;
    let gamesContent;

    if (games.length) {
      gamesContent = (
        <table className="table table-borderless ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Platform</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {games.map(game => {
              return (
                <tr key={game._id}>
                  <td>
                    <Link to={`/game/${game._id}`} className="text-dark">
                      <img
                        src={`http:${game.image}`}
                        className="cover-small rounded mr-1"
                        alt=""
                      />
                      {game.name}
                    </Link>
                  </td>
                  <td className="align-middle">
                    <i
                      className={classnames('fab', {
                        'fa-playstation': game.platform === '48',
                        'fa-xbox': game.platform === '49'
                      })}
                    />
                  </td>
                  <td className="align-middle">
                    <Moment format="DD/MM/YYYY">{game.date}</Moment>
                  </td>
                  <td className="align-middle">
                    <i
                      className="fas fa-trash-alt"
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.onClickDelete(game._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      gamesContent = (
        <div className="alert alert-warning">
          You have not added any games yet
        </div>
      );
    }
    return (
      <div className="card card-body animated fadeIn">
        {gamesContent}
        <Link to="/dashboard/add-game" className="btn btn-info">
          Add Game
        </Link>
      </div>
    );
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired,
  deleteGame: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteGame }
)(Games);
