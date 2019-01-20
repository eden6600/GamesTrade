import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class NewGameItem extends Component {
  render() {
    const { game } = this.props;
    return (
      <div className="card h-100 shadow-sm animated fadeIn mx-2 ">
        <Link to={`/game/${game._id}`}>
          <img
            className="card-img-top cover-card"
            src={game.image.replace('thumb', 'cover_big')}
            alt=""
            //style={{ height: '295px' }}
          />
        </Link>
        <div className="card-body">
          <Link to={`/game/${game._id}`} className="text-dark">
            <p className="font-weight-bold">{game.name}</p>
          </Link>
          <div className="d-flex justify-content-start">
            <Link to={`/profile/${game.user._id}`} className="">
              <img src={game.user.avatar} alt="" className="avatar-med mr-2" />
            </Link>
            <div>
              <Link to={`/profile/${game.user._id}`}>
                <span>{game.user.name}</span>
              </Link>
              <br />
              <small>
                <Moment format="DD/MM/YYYY">{game.date}</Moment>
              </small>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-secondary">
            <span className="">
              <i className="fas fa-map-marker-alt mr-1" />
              {game.profile.location}
            </span>

            {game.platform === '48' ? (
              <span className="">
                <i className="fab fa-playstation mr-1" />
                PS4
              </span>
            ) : (
              <span className="">
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
