import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import NewGames from './new-games/NewGames';
import TopGames from './top-games/TopGames';
import { getAllGames } from '../../actions/gameActions';
import Spinner from '../common/Spinner';

class Home extends Component {
  state = {
    psGames: null,
    xboxGames: null,
    topPsGames: null,
    topXboxGames: null
  };

  componentDidMount() {
    this.props.getAllGames();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.games.allGames) {
      const { allGames } = nextProps.games;
      const topXboxGames = [];
      const topPsGames = [];
      const psGamesIds = allGames
        .filter(item => item.platform === '48')
        .splice(0, 5)
        .map(item => item.igdb_id);

      for (let i = 0; i < psGamesIds.length; i++) {
        const id = psGamesIds[i];
        let reps = 1;
        let temp = {};

        for (let j = i + 1; j < psGamesIds.length; j++) {
          if (psGamesIds[j] === id) {
            reps++;
          }
        }

        temp.id = id;
        temp.reps = reps;
        if (topPsGames.map(item => item.id).indexOf(id) === -1)
          topPsGames.push(temp);
      }
      topPsGames.forEach(item => {
        const index = allGames.map(item => item.igdb_id).indexOf(item.id);
        if (index !== -1) {
          item.game = allGames[index];
        }
      });

      const xboxGamesIds = allGames
        .filter(item => item.platform === '49')
        .splice(0, 5)
        .map(item => item.igdb_id);

      for (let i = 0; i < xboxGamesIds.length; i++) {
        const id = xboxGamesIds[i];
        let reps = 1;
        let temp = {};

        for (let j = i + 1; j < xboxGamesIds.length; j++) {
          if (xboxGamesIds[j] === id) {
            reps++;
          }
        }

        temp.id = id;
        temp.reps = reps;
        if (topXboxGames.map(item => item.id).indexOf(id) === -1)
          topXboxGames.push(temp);
      }
      topXboxGames.forEach(item => {
        const index = allGames.map(item => item.igdb_id).indexOf(item.id);
        if (index !== -1) {
          item.game = allGames[index];
        }
      });

      this.setState({
        psGames: allGames
          .filter(item => item.platform === '48')
          .sort((a, b) =>
            new Date(a.date) > new Date(b.date)
              ? -1
              : new Date(a.date) < new Date(b.date)
              ? 1
              : 0
          )

          .slice(0, 4),
        xboxGames: allGames
          .filter(item => item.platform === '49')
          .sort((a, b) =>
            new Date(a.date) > new Date(b.date)
              ? -1
              : new Date(a.date) < new Date(b.date)
              ? 1
              : 0
          )

          .slice(0, 4),
        topPsGames: topPsGames.sort((a, b) => b.reps - a.reps),
        topXboxGames: topXboxGames.sort((a, b) => b.reps - a.reps)
      });
    }
  }

  render() {
    const { allGames, loading } = this.props.games;
    const { psGames, xboxGames, topPsGames, topXboxGames } = this.state;

    if (!allGames || loading || !topPsGames || !topXboxGames)
      return <Spinner />;
    else {
      return (
        <div className="container">
          <h4>
            <i className="fas fa-crown mr-1" />
            Top Games
          </h4>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <TopGames games={topPsGames} platform="PS4" />
            </div>
            <div className="col-sm-12 col-md-6">
              <TopGames games={topXboxGames} platform="Xbox One" />
            </div>
          </div>
          <hr className="mb-4" />

          <h4>
            <i className="fab fa-playstation mr-1" />
            New PS4 Games
          </h4>
          <div className="row">
            <NewGames games={psGames} />
          </div>
          <Link to="all-games/PS4/48" className="btn btn-info mt-2">
            All PS4 Games
          </Link>

          <hr className="mb-4" />
          <h4>
            <i className="fab fa-xbox mr-1" />
            New Xbox One Games
          </h4>
          <div className="row">
            <NewGames games={xboxGames} />
          </div>
          <Link to="all-games/Xbox One/49" className="btn btn-info mt-2">
            All Xbox One Games
          </Link>
        </div>
      );
    }
  }
}

Home.propTypes = {
  getAllGames: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  games: state.games
});

export default connect(
  mapStateToProps,
  { getAllGames }
)(withRouter(Home));
