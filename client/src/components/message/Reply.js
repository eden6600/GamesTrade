import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Reply extends Component {
  render() {
    const { reply, currentUser } = this.props;

    return (
      <div className="card card-body m-2 animated bounceInUp">
        <div className="d-flex">
          <div className="px-2">
            <img src={reply.avatar} className="avatar-med" alt="" />
          </div>
          <p className="lead flex-grow-1 px-2">{reply.text}</p>

          {reply.user === currentUser ? (
            <i
              className="fas fa-times-circle text-danger"
              style={{ cursor: 'pointer' }}
              onClick={() => this.props.onDelete(reply._id)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

Reply.propTypes = {
  onDelete: PropTypes.func.isRequired,
  reply: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired
};

export default Reply;
