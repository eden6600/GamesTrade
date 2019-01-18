import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getMatches } from '../../actions/gameActions';

class Matches extends Component {
  componentDidMount() {
    this.props.getMatches(this.props.userGames, this.props.allGames);
  }

  render() {
    const { matches } = this.props;

    if (!matches) return null;

    if (!matches.length) {
      return <div className="alert alert-warning text-center">No Matches</div>;
    }

    return (
      <div className="card card-body">
        <table className="table table-borderless ">
          <thead>
            <tr className="bt-0">
              <th>Game Offered</th>
              <th>Game Demand</th>
              <th>User</th>
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
              </tr>
            ))}
          </tbody>
        </table>
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
