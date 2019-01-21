import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import Message from './Message';
import Reply from './Reply';
import CreateReply from './CreateReply';
import Spinner from '../common/Spinner';
import isEmpty from '../../utils/isEmpty';
import {
  getMessage,
  sendReply,
  deleteReply
} from '../../actions/messageActions';

class MessageLayout extends Component {
  state = {
    reply: ''
  };

  componentDidMount() {
    this.props.getMessage(this.props.match.params.id);
  }

  onChange = text => this.setState({ reply: text });

  onReplySubmit = () => {
    const { user } = this.props.auth;
    const newReply = {};

    newReply.name = user.name;
    newReply.avatar = user.avatar;
    newReply.text = this.state.reply;

    this.props.sendReply(this.props.messages.message._id, newReply);
    this.setState({ reply: '' });
  };

  onReplyDelete = replyID => {
    console.log(replyID);
    this.props.deleteReply(this.props.messages.message._id, replyID);
  };

  render() {
    const { user } = this.props.auth;
    const { message, loading } = this.props.messages;

    if (isEmpty(message) || loading) {
      return <Spinner />;
    } else {
      return (
        <div className="container">
          <Link to="/dashboard" className="btn btn-link">
            <i className="fas fa-arrow-circle-left" /> Back to Dashboard
          </Link>

          <div className="card mb-2">
            <Message message={message} currentUser={user.id} />
            {message.replies.map(reply => (
              <Reply
                key={reply._id}
                reply={reply}
                currentUser={user.id}
                onDelete={this.onReplyDelete}
              />
            ))}
          </div>
          <CreateReply
            onChange={this.onChange}
            onSubmit={this.onReplySubmit}
            value={this.state.reply}
            disable={this.state.reply ? false : true}
          />
        </div>
      );
    }
  }
}

MessageLayout.propTypes = {
  deleteReply: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  sendReply: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { getMessage, sendReply, deleteReply }
)(withRouter(MessageLayout));
