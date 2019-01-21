import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class Messages extends Component {
  render() {
    const { messages, currentUser } = this.props;

    if (!messages.length) {
      return <div className="alert alert-warning text-center">No messages</div>;
    }

    return (
      <ul className="list-group">
        {messages.map(message => {
          return (
            <Link to={`/message/${message._id}`} key={message._id}>
              <li className="list-group-item d-flex text-dark">
                <div className="px-2 my-auto">
                  {message.from._id === currentUser ? (
                    <i className="fas fa-sign-out-alt" />
                  ) : (
                    <i className="fas fa-sign-in-alt" />
                  )}
                </div>

                <div className="px-2 my-auto">
                  <img
                    src={
                      message.from._id === currentUser
                        ? message.to.avatar
                        : message.from.avatar
                    }
                    className="avatar-med mr-2"
                    alt=""
                  />
                </div>
                <div className="flex-grow-1 px-2">
                  <span>
                    {message.from._id === currentUser
                      ? message.to.name
                      : message.from.name}
                  </span>
                  <br />
                  <small>
                    <Moment format="DD/MM/YYYY">{message.date}</Moment>
                  </small>
                </div>

                <div className="px-2">
                  <img
                    src={message.aboutGame.image}
                    className="cover-small rounded"
                    alt=""
                  />
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired
};

export default Messages;
