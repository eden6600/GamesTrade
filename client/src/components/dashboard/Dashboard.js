import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Spinner from '../common/Spinner';
import isEmpty from '../../utils/isEmpty';
import { getCurrentProfile } from '../../actions/profileActions';
import { getUserGames, getAllGames } from '../../actions/gameActions';
import { getMessages } from '../../actions/messageActions';
import DashboardMenu from './DashboardMenu';
import EditProfile from './EditProfile';
import Games from './Games';
import Matches from './Matches';
import Messages from './Messages';

class Dashboard extends Component {
  state = {
    view: null,
    active: null,
    lastActive: null
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getUserGames();
    this.props.getAllGames();
    this.props.getMessages();
  }

  onViewChange = e => {
    this.setState(
      { lastActive: this.state.active, active: e.target, view: e.target.name },
      () => {
        if (
          this.state.lastActive &&
          this.state.active !== this.state.lastActive
        ) {
          this.state.lastActive.classList.remove('active');
        }
        this.state.active.classList.add('active');
      }
    );
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { userGames, allGames, gamesLoading } = this.props.games;
    const { messages } = this.props;

    let viewContent;
    switch (this.state.view) {
      case 'edit-profile':
        viewContent = <EditProfile />;
        break;
      case 'games':
        viewContent = <Games games={userGames} />;
        break;
      case 'matches':
        viewContent = <Matches userGames={userGames} allGames={allGames} />;
        break;
      case 'messages':
        viewContent = (
          <Messages messages={messages.messages} currentUser={user.id} />
        );
        break;
      default:
        viewContent = null;
    }

    let dashboardContent;

    if (profile === null || loading || gamesLoading || !messages) {
      dashboardContent = <Spinner />;
    } else {
      if (!isEmpty(profile)) {
        dashboardContent = (
          <div>
            <div className="row">
              <div className="col-sm-12 col-md-3">
                <DashboardMenu onViewChange={this.onViewChange} />
              </div>
              <div className="col-sm-12 col-md-9">{viewContent}</div>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="display-4">Dashboard</h1>
            <p className="lead text-muted">Welcome {user.name}</p>
          </div>
        </div>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getMessages: PropTypes.func.isRequired,
  getAllGames: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getUserGames: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  games: state.games,
  auth: state.auth,
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getUserGames, getAllGames, getMessages }
)(withRouter(Dashboard));
