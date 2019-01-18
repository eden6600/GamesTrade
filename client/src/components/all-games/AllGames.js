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
      console.log(games);
      return (
        <div className="container">
          <h4 className="mb-2">All {this.props.match.params.platform} Games</h4>
          <ul className="list-group">
            {games.map(item => (
              <AllGamesItem game={item} />
            ))}
          </ul>
        </div>
      );
    }
  }
}

AllGames.propTypes = {
  getAllPlatformGames: PropTypes.func.isRequired,
  platform: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  games: state.games.allPlatformGames
});

export default connect(
  mapStateToProps,
  { getAllPlatformGames }
)(withRouter(AllGames));
