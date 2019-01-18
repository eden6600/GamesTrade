import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { createEditProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  state = {
    location: '',
    phone: '',
    facebook: '',
    instagram: '',
    errors: {}
  };

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

    this.props.createEditProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-12 mx-auto">
            <Link to="/dashboard" className="btn btn-light">
              Back
            </Link>
            <h1 className="display-4 text-center">Create Your Profile</h1>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i
                      className={classnames('fas fa-map-marker-alt', {
                        'text-danger': errors.location
                      })}
                    />
                  </span>
                </div>
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.location
                  })}
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  placeholder="Location"
                />
                <div className="invalid-feedback">
                  {errors.location ? errors.location : null}
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i
                      className={classnames('fas fa-phone', {
                        'text-danger': errors.phone
                      })}
                    />
                  </span>
                </div>
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.phone
                  })}
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  placeholder="Phone Number"
                />
                <div className="invalid-feedback">
                  {errors.phone ? errors.phone : null}
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i
                      className={classnames('fab fa-facebook', {
                        'text-danger': errors.facebook
                      })}
                    />
                  </span>
                </div>
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.facebook
                  })}
                  name="facebook"
                  value={this.state.facebook}
                  onChange={this.onChange}
                  placeholder="Facebook Link"
                />
                <div className="invalid-feedback">
                  {errors.facebook ? errors.facebook : null}
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i
                      className={classnames('fab fa-instagram', {
                        'text-danger': errors.instagram
                      })}
                    />
                  </span>
                </div>
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.instagram
                  })}
                  name="instagram"
                  value={this.state.instagram}
                  onChange={this.onChange}
                  placeholder="Instagram Link"
                />
                <div className="invalid-feedback">
                  {errors.instagram ? errors.instagram : null}
                </div>
              </div>

              <button type="submit" className="btn btn-info btn-block">
                Create Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
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
)(CreateProfile);
