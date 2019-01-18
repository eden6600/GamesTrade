import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewGameItem extends Component {
  render() {
    const { game } = this.props;
    return (
      <div className="card h-100 shadow-sm animated fadeIn">
        <Link to={`/game/${game._id}`}>
          <img
            className="card-img-top"
            src={game.image.replace('thumb', 'cover_big')}
            alt=""
            style={{ maxHeight: '270px' }}
          />
        </Link>
        <div className="card-body">
          <Link to={`/game/${game._id}`} className="text-dark">
            <p className="font-weight-bold">{game.name}</p>
          </Link>
          <Link to={`/profile/${game.user._id}`} className="text-dark">
            <img src={game.user.avatar} alt="" className="avatar-med" />
            <span>{game.user.name}</span>
          </Link>
          <hr />
          <div className="d-flex justify-content-between text-secondary">
            <span className="my-badge">
              <i className="fas fa-map-marker-alt mr-1" />
              {game.profile.location}
            </span>

            {game.platform === '48' ? (
              <span className="my-badge">
                <i className="fab fa-playstation mr-1" />
                PS4
              </span>
            ) : (
              <span className="my-badge">
                <i className="fab fa-xbox mr-1" />
                Xbox One
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NewGameItem;
