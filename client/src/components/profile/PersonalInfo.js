import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PersonalInfo extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="card card-body">
        <img src={data.user.avatar} class="card-img-top" alt="" />
        <ul className="list-group-flush pl-0">
          <li className="list-group-item">
            <i className="fas fa-user-circle mr-2" />
            {data.user.name}
          </li>
          <li className="list-group-item">
            <i className="fas fa-map-marker-alt mr-2" />
            {data.location}
          </li>
          <li className="list-group-item">
            <i className="fas fa-phone mr-2" />
            {data.phone}
          </li>
          {data.social.facebook ? (
            <li className="list-group-item">
              <i className="fab fa-facebook mr-2" />
              <a href={data.social.facebook}>Facebook</a>
            </li>
          ) : null}
          {data.social.instagram ? (
            <li className="list-group-item">
              <i className="fab fa-instagram mr-2" />
              <a href={data.social.instagram}>Instagram</a>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
}

PersonalInfo.propTypes = {
  data: PropTypes.object.isRequired
};

export default PersonalInfo;
