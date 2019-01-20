import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { getAllPlatformGames } from '../../actions/gameActions';
import AllGamesItem from './AllGamesItem';
import Spinner from '../common/Spinner';

class AllGames extends Component {
  componentDidMount() {
    this.props.getAllPlatformGames(this.props.match.params.id);
  }

  render() {
    const { games, loading } = this.props;

    if (!games || loading) return <Spinner />;
    else {
      return (
        <div className="container">
          <Link to="/home" className="btn btn-link pl-0">
            <i className="fas fa-arrow-circle-left" /> Back to Home
          </Link>
          <h4 className="mb-2">All {this.props.match.params.platform} Games</h4>
          <p>{games.length} Games found</p>
          <ul className="list-group">
            {games.length ? (
              games.map((item, index) => (
                <AllGamesItem game={item} key={index} />
              ))
            ) : (
              <div className="alert alert-warning text-center">No Games</div>
            )}
          </ul>
        </div>
      );
    }
  }
}

AllGames.propTypes = {
  getAllPlatformGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  games: state.games.allPlatformGames
});

export default connect(
  mapStateToProps,
  { getAllPlatformGames }
)(withRouter(AllGames));
