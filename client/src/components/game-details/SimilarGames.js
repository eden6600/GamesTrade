import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { getAllGames } from '../../actions/gameActions';
import Spinner from '../common/Spinner';

class SimilarGames extends Component {
  state = {
    similarMatches: []
  };

  componentDidMount() {
    this.handleView(this.props.allGames, this.props.similarGames);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.handleView(this.props.allGames, nextProps.similarGames);
  }

  handleView = (allGames, similarGames) => {
    const matches = [];

    allGames.forEach(game => {
      if (
        similarGames.indexOf(game.igdb_id) !== -1 &&
        matches.map(item => item.igdb_id).indexOf(game.igdb_id) === -1
      ) {
        matches.push(game);
      }
    });

    this.setState({ similarMatches: matches });
  };

  render() {
    let content;

    if (this.state.loading) return <Spinner />;

    if (this.state.similarMatches.length) {
      content = this.state.similarMatches.map(game => {
        return (
          <div key={game._id} className="pr-2">
            <Link to={`/game/${game._id}`}>
              <img
                src={game.image.replace('thumb', 'cover_big')}
                className="cover-med"
                alt=""
              />
            </Link>
          </div>
        );
      });
    } else {
      content = (
        <div className="col-sm-12">
          <div className="alert alert-info text-center">No Games</div>
        </div>
      );
    }

    return (
      <div>
        <div className="card card-body">
          <h4 className="card-title">Similar Games Available</h4>
          <div className="d-flex flex-row">{content}</div>
        </div>
      </div>
    );
  }
}

SimilarGames.propTypes = {
  similarGames: PropTypes.array.isRequired,
  getAllGames: PropTypes.func.isRequired,
  allGames: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  allGames: state.games.allGames
});

export default connect(
  mapStateToProps,
  { getAllGames }
)(withRouter(SimilarGames));
