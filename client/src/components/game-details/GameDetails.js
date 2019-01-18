import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import Spinner from '../common/Spinner';
import { getGame, getUserGames, getAllGames } from '../../actions/gameActions';
import SimilarGames from './SimilarGames';

class GameDetails extends Component {
  state = {
    game: null
  };
  componentDidMount() {
    //this.props.getGame(this.props.match.params.id);
    this.props.getAllGames();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.allGames) {
      this.setState({
        game:
          nextProps.allGames[
            nextProps.allGames
              .map(item => item._id)
              .indexOf(this.props.match.params.id)
          ]
      });
    }

    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        game: this.props.allGames[
          this.props.allGames
            .map(item => item._id)
            .indexOf(nextProps.match.params.id)
        ]
      });
    }
  }

  render() {
    const { loading } = this.props.games;
    const { game } = this.state;

    if (!game || loading) return <Spinner />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="card">
              <div className="card-image-top p-2">
                <img
                  src={game.image.replace('thumb', 'cover_big')}
                  className=""
                  alt=""
                />
              </div>
              <div className="card-body">
                <h4 className="card-title">{game.name}</h4>
                <div className="row ">
                  <div className="col-sm-3">
                    <img
                      src={game.user.avatar}
                      style={{ width: '50px', marginRight: '5px' }}
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  <div className="col-sm-9">
                    <Link
                      to={`/profile/${game.user._id}`}
                      className="text-dark"
                    >
                      {game.user.name}
                    </Link>
                    <br />
                    <span>{game.profile.location}</span>
                    <br />
                    <Moment format="DD/MM/YYYY">{game.date}</Moment>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-9">
            <div className="card h-100">
              <div className="card-body">
                <h4 className="card-title">Games For Trade</h4>
                <table className="table">
                  <tbody>
                    {game.trade_for.map(game => {
                      return (
                        <tr key={game._id}>
                          <td>
                            <img
                              src={game.image}
                              className="cover-small rounded mr-2"
                              alt=""
                            />
                            {game.name}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <SimilarGames
              similarGames={game.gamesLike}
              allGames={this.props.games.allGames}
            />
          </div>
        </div>
      </div>
    );
  }
}

GameDetails.propTypes = {
  getGame: PropTypes.func.isRequired,
  getUserGames: PropTypes.func.isRequired,
  games: PropTypes.object.isRequired,
  getAllGames: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  games: state.games,
  allGames: state.games.allGames
});

export default connect(
  mapStateToProps,
  { getGame, getUserGames, getAllGames }
)(withRouter(GameDetails));
