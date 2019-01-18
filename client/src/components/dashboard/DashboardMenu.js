import React, { Component } from 'react';

class DashboardMenu extends Component {
  onClick = e => {
    this.props.onViewChange(e);
  };

  render() {
    return (
      <ul className="list-group mb-3">
        <button
          className="list-group-item list-group-item-action border-0"
          name="edit-profile"
          onClick={this.onClick}
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-user-circle" /> Edit Profile
        </button>
        <button
          className="list-group-item list-group-item-action border-0"
          name="games"
          onClick={this.onClick}
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-list-ul" /> My Games
        </button>
        <button
          className="list-group-item list-group-item-action border-0"
          name="matches"
          onClick={this.onClick}
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-check-double" /> Matches
        </button>
        <button
          className="list-group-item list-group-item-action border-0"
          name="wishlist"
          onClick={this.onClick}
          style={{ cursor: 'pointer' }}
        >
          <i className="far fa-star" /> Wishlist
        </button>
      </ul>
    );
  }
}

export default DashboardMenu;
