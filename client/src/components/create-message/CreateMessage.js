import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { sendMessage } from '../../actions/messageActions';

class CreateMessage extends React.Component {
  state = {
    modal: false,
    message: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { game } = this.props;
    const { message } = this.state;
    const newMessage = {};

    newMessage.from = game.offer.user._id;
    newMessage.to = game.demand.user._id;
    newMessage.aboutGame = {};
    newMessage.aboutGame.name = game.demand.name;
    newMessage.aboutGame.image = game.demand.image;
    newMessage.text = message;

    this.props.sendMessage(newMessage);
    this.toggle();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.props.show) {
      this.setState({ modal: nextProps.show });
    }
  }

  render() {
    const { game } = this.props;

    if (!game) {
      return null;
    } else {
      return (
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              Ask {game.demand.user.name} about {game.demand.name}
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Write something..."
                  name="message"
                  onChange={this.onChange}
                  rows="5"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.onSubmit}>
                Send
              </Button>{' '}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
}

CreateMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { sendMessage }
)(withRouter(CreateMessage));
