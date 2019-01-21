import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getMatches } from '../../actions/gameActions';
import CreateMessage from '../create-message/CreateMessage';

class Matches extends Component {
  state = {
    match: null,
    modal: false
  };

  componentDidMount() {
    this.props.getMatches(this.props.userGames, this.props.allGames);
  }

  onClick = match => {
    this.setState({ modal: true, match });
  };

  render() {
    const { matches } = this.props;

    if (!matches) return null;

    if (!matches.length) {
      return (
        <div className="card card-body">
          <div className="alert alert-warning text-center">No Matches</div>
        </div>
      );
    }

    return (
      <div className="card card-body">
        <table className="table table-borderless ">
          <thead>
            <tr className="bt-0">
              <th>Your Game</th>
              <th>Wanted Game</th>
              <th>User</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={match.offer.image}
                    className="rounded cover-small"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src={match.demand.image}
                    className="rounded cover-small"
                    alt=""
                  />
                </td>
                <td>
                  <Link to={`/profile/${match.demand.user._id}`}>
                    <img
                      src={match.demand.user.avatar}
                      className="avatar rounded-circle mr-2"
                      alt=""
                    />
                    {match.demand.user.name}
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => this.onClick(match)}
                    className="btn btn-info"
                  >
                    <i className="far fa-envelope" /> Contact user
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateMessage show={this.state.modal} game={this.state.match} />
      </div>
    );
  }
}

Matches.propTypes = {
  getMatches: PropTypes.func.isRequired,
  matches: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  matches: state.games.matches
});

export default connect(
  mapStateToProps,
  { getMatches }
)(Matches);
