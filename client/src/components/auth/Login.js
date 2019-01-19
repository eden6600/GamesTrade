import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuth) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };
  render() {
    const { errors } = this.state;

    // Error message for failed login
    let errorMsg;
    if (errors.email) {
      errorMsg = <div className="alert alert-danger">User Not Found</div>;
    } else if (errors.password) {
      errorMsg = (
        <div className="alert alert-danger">
          Email or Password Are Not Correct
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-sm-12 col-md-8 mx-auto text-center">
            <h1 className="display-4 mb-3">Log In</h1>
            <p className="lead text-center">
              Sign in to your Games Trade account
            </p>

            {errorMsg}

            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-at" />
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Email"
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder="Password"
                />
              </div>

              <button type="submit" className="btn btn-info btn-block">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
