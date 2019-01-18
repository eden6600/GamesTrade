import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createEditProfile } from '../../actions/profileActions';
import classnames from 'classnames';

import isEmpty from '../../utils/isEmpty';

class EditProfile extends Component {
  state = {
    location: '',
    phone: '',
    errors: {}
  };

  componentDidMount() {
    const { profile } = this.props.profile;

    profile.location = !isEmpty(profile.location) ? profile.location : '';
    profile.phone = !isEmpty(profile.phone) ? profile.phone : '';
    profile.social.facebook = !isEmpty(profile.social.facebook)
      ? profile.social.facebook
      : '';
    profile.social.instagram = !isEmpty(profile.social.instagram)
      ? profile.social.instagram
      : '';

    this.setState({
      email: profile.user.email,
      name: profile.user.name,
      location: profile.location,
      phone: profile.phone,
      facebook: profile.social.facebook,
      instagram: profile.social.instagram
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      location: this.state.location,
      phone: this.state.phone,
      facebook: this.state.facebook,
      instagram: this.state.instagram
    };

    this.props.createEditProfile(profileData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="card card-body animated fadeIn">
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              disabled
              name="email"
              value={this.state.email}
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              disabled
              name="name"
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className={classnames('form-control', {
                'is-invalid': errors.location
              })}
              name="location"
              value={this.state.location}
              onChange={this.onChange}
            />
            <div className="invalid-feedback">
              {errors.location ? errors.location : null}
            </div>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className={classnames('form-control', {
                'is-invalid': errors.phone
              })}
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
            />
            <div className="invalid-feedback">
              {errors.phone ? errors.phone : null}
            </div>
          </div>

          <div className="form-group">
            <label>Facebook</label>
            <input
              type="text"
              className={classnames('form-control', {
                'is-invalid': errors.facebook
              })}
              name="facebook"
              value={this.state.facebook}
              onChange={this.onChange}
            />
            <div className="invalid-feedback">
              {errors.facebook ? errors.facebook : null}
            </div>
          </div>

          <div className="form-group">
            <label>Instagram</label>
            <input
              type="text"
              className={classnames('form-control', {
                'is-invalid': errors.instagram
              })}
              name="instagram"
              value={this.state.instagram}
              onChange={this.onChange}
            />
            <div className="invalid-feedback">
              {errors.instagram ? errors.instagram : null}
            </div>
          </div>

          <button type="submit" className="btn btn-block btn-info">
            Update Profile
          </button>
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createEditProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createEditProfile }
)(EditProfile);
