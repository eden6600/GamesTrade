import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { searchGame } from '../../utils/igdb';
import { addGame } from '../../actions/gameActions';

class AddGame extends Component {
  state = {
    platform: '48',
    offerInput: '',
    offer: null,
    demandInput: '',
    searchTerm: '',
    demand: [],
    results: [],
    loading: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onClickSearch = () => {
    const searchTerm = this.state.demandInput
      ? this.state.demandInput
      : this.state.offerInput;

    if (true) {
      this.setState({ loading: true }, () => {
        searchGame(searchTerm, this.state.platform)
          .then(res => this.setState({ results: res.data, loading: false }))
          .catch(err => console.log(err));
      });
    }
  };

  onClickReset = () => {
    this.setState({
      offer: null,
      offerInput: '',
      demand: [],
      demandInput: '',
      results: []
    });
  };

  onClickAddOffer = game => {
    game.platform = this.state.platform;

    this.setState({
      results: [],
      offer: game,
      offerInput: game.name
    });
  };

  onClickAddDemand = game => {
    game.platform = this.state.platform;

    this.setState({
      results: [],
      demand: [...this.state.demand, game],
      demandInput: ''
    });
  };

  onClickDelete = id => {
    this.setState({
      demand: this.state.demand.filter(game => game.id !== id)
    });
  };

  onClickSubmit = () => {
    const newGame = {};

    newGame.igdb_id = this.state.offer.id;
    newGame.name = this.state.offer.name;
    newGame.platform = this.state.platform;
    newGame.image = this.state.offer.cover.url;
    newGame.trade_for = this.state.demand.map(game => {
      return {
        igdb_id: game.id,
        name: game.name,
        platform: this.state.platform,
        image: game.cover.url
      };
    });
    newGame.gamesLike = this.state.offer.games;
    addGame(newGame, this.props.history);
  };

  render() {
    const {
      platform,
      offerInput,
      offer,
      demandInput,
      demand,
      results,
      loading
    } = this.state;

    let offerInputIcon;
    if (loading && !demandInput) {
      offerInputIcon = (
        <button className="input-group-text btn search-icon" disabled>
          <i className="fa fa-spinner fa-spin" />
        </button>
      );
    } else if (offer) {
      offerInputIcon = (
        <button
          className="input-group-text btn btn-primary search-icon"
          onClick={this.onClickReset}
        >
          <i className="fas fa-redo" />
        </button>
      );
    } else {
      offerInputIcon = (
        <button
          className="input-group-text btn btn-primary search-icon"
          onClick={this.onClickSearch}
        >
          <i className="fas fa-search" />
        </button>
      );
    }

    let demandInputIcon;
    if (loading) {
      demandInputIcon = <i className="fa fa-spinner fa-spin" />;
    } else {
      demandInputIcon = <i className="fas fa-search" />;
    }

    return (
      <div className="container">
        <Link to="/dashboard" className="btn btn-link pl-0">
          <i className="fas fa-arrow-circle-left" /> Back to Dashboard
        </Link>
        <div className="card">
          <div className="card-header bg-info text-white">
            <h4>Add New Game</h4>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Platform</label>
              <select
                name="platform"
                className="custom-select"
                value={platform}
                onChange={this.onChange}
                disabled={offer}
              >
                <option value="48">Playstation 4</option>
                <option value="49">Xbox One</option>
              </select>
            </div>
            <label>Game To Offer</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="offerInput"
                value={offerInput}
                onChange={this.onChange}
                disabled={offer}
              />
              <div className="input-group-prepend">{offerInputIcon}</div>
            </div>

            {offer ? (
              <div className="mt-3">
                <label>Demand Games</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="demandInput"
                    value={demandInput}
                    onChange={this.onChange}
                  />
                  <div className="input-group-prepend">
                    <button
                      className="input-group-text btn btn-primary search-icon"
                      onClick={this.onClickSearch}
                    >
                      {demandInputIcon}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {results.length ? (
              <ul className="list-group">
                {results.map(result => (
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                    key={result.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.state.demandInput
                        ? this.onClickAddDemand(result)
                        : this.onClickAddOffer(result);
                    }}
                    alt=""
                  >
                    <img
                      src={
                        result.cover !== undefined
                          ? result.cover.url
                          : 'https://cdn2.iconfinder.com/data/icons/web-and-ui-8/20/371-512.png'
                      }
                      className="mr-2 cover-small rounded"
                      alt=""
                    />
                    {result.name}
                  </button>
                ))}
              </ul>
            ) : null}

            {demand.length ? (
              <React.Fragment>
                <ul className="list-group my-3">
                  {demand.map(game => (
                    <li className="list-group-item bg-light" key={game.id}>
                      <img
                        src={
                          game.cover !== undefined
                            ? game.cover.url
                            : 'https://cdn2.iconfinder.com/data/icons/web-and-ui-8/20/371-512.png'
                        }
                        className="mr-2 cover-small rounded"
                        alt=""
                      />
                      {game.name}
                      <i
                        className="fas fa-times float-right text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.onClickDelete(game.id)}
                      />
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-info btn-block"
                  onClick={this.onClickSubmit}
                >
                  Submit
                </button>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

AddGame.propTypes = {
  addGame: PropTypes.func.isRequired
};

export default connect(
  null,
  { addGame }
)(AddGame);
