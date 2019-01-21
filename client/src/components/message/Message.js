import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';

class Message extends Component {
  state = {
    message: null
  };

  componentDidMount() {
    this.setState({ message: this.props.message });
  }

  render() {
    const { currentUser } = this.props;
    const { message } = this.state;

    if (!message) {
      return null;
    } else {
      return (
        <div>
          <div className="card-header bg-light d-flex">
            <div className="px-2">
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

            <div className="ml-auto">
              <img
                src={message.aboutGame.image}
                className="cover-small mr-2"
                alt=""
              />
              <span>{message.aboutGame.name}</span>
            </div>
          </div>
          <div className="card-body d-flex">
            <div className="px-2">
              <img src={message.from.avatar} className="avatar-med" alt="" />
            </div>
            <p className="lead">{message.text}</p>
            <hr />
          </div>
        </div>
      );
    }
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired
};

export default Message;
