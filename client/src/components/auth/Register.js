import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';

class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    name: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/profile');
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-sm-8 mx-auto">
            <h1 className="display-4 mb-3 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Games Trade account</p>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i
                      className={classnames('fas fa-at', {
                        'text-danger': errors.email
                      })}
                    />
                  </span>
                </div>
                <input
                  type="email"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Email"
                />
                <div className="invalid-feedback">
                  {errors.email ? errors.email : null}
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i
                      className={classnames('fas fa-key', {
                        'text-danger': errors.password
                      })}
                    />
                  </span>
                </div>
                <input
                  type="password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder="Password"
                />
                <div className="invalid-feedback">
                  {errors.password ? errors.password : null}
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i
                      className={classnames('fas fa-key', {
                        'text-danger': errors.password2
                      })}
                    />
                  </span>
                </div>
                <input
                  type="password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password2
                  })}
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  placeholder="Confirm Password"
                />
                <div className="invalid-feedback">
                  {errors.password2 ? errors.password2 : null}
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i
                      className={classnames('fas fa-user-circle', {
                        'text-danger': errors.name
                      })}
                    />
                  </span>
                </div>
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                  })}
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Name"
                />
                <div className="invalid-feedback">
                  {errors.name ? errors.name : null}
                </div>
              </div>

              <button type="submit" className="btn btn-info btn-block">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
