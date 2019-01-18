import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getProfile } from '../../actions/profileActions';
import { getUserGamesById } from '../../actions/gameActions';
import Spinner from '../common/Spinner';
import PersonalInfo from './PersonalInfo';
import Games from './Games';

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
    this.props.getUserGamesById(this.props.match.params.id);
  }

  render() {
    if (!this.props.profile || !this.props.userGames) return <Spinner />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <PersonalInfo data={this.props.profile} />
          </div>
          <div className="col-sm-12 col-md-9">
            <Games data={this.props.userGames} />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  userGames: PropTypes.array.isRequired,
  getProfile: PropTypes.func.isRequired,
  getUserGamesById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profileToShow,
  userGames: state.games.userGames
});

export default connect(
  mapStateToProps,
  { getProfile, getUserGamesById }
)(withRouter(Profile));
