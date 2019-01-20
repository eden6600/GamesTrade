import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function AllGamesItem(props) {
  const { game } = props;
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <div className="">
          <Link to={`/game/${game._id}`}>
            <img src={game.image} alt="" className="rounded cover-small" />{' '}
            <span>{game.name}</span>
          </Link>
        </div>
        <div className="my-auto">
          <Link to={`/profile/${game.user._id}`}>
            <span className="border-right pr-2">
              <img
                src={game.user.avatar}
                alt=""
                className="avatar-med circle"
              />{' '}
              {game.user.name}
            </span>
          </Link>
          <span className="border-right px-2">{game.profile.location}</span>
          <span className="px-2">
            <Moment format="DD/MM/YYYY">{game.date}</Moment>
          </span>
        </div>
      </div>
    </li>
  );
}
