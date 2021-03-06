import React, { Component } from "react";
import { Link } from "react-router-dom";

import propTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";
import { clearCurrentProfile } from "../../Actions/profileActions";

class Navbar extends Component {
  onLogoutCick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              title="You must have a gravitar connected to ur email"
              style={{ width: "25px", marginRight: "5px" }}
            />{" "}
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={this.onLogoutCick}>
            <span style={{ fontSize: "16px" }}>
              <i className="fas fa-sign-out-alt " />
            </span>
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Reacterest
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapsStateToPorps = state => ({
  auth: state.auth
});
export default connect(
  mapsStateToPorps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
