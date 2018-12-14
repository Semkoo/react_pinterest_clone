import React, { Component } from "react";
import { Link } from "react-router-dom";

import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../Actions/profileActions";

import "../Pinterest/Pinterest.css";
import PinterestItem from "../Pinterest/PinterestItem";

import Spinner from "../Common/Spinner";

class Dashboard extends Component {
  //Call right away
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    // console.log(this.props.profile);
    const { profile, loading } = this.props.profile;
    // const { auth } = this.props.auth;
    let dashboardContent;

    if (profile === null || loading === true) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted"> Welcome {user.name}</p>
          {/* <!-- Dashboard Actions --> */}
          <hr />
          <div className="btn-group mb-4" role="group">
            <Link to="/add-article" className="btn btn-light">
              <i className="fas fa-passport text-info mr-1" />
              Add Image
            </Link>
          </div>

          <div className="container">
            <div className="row">
              <div className="card-columns">
                {profile.posts.map(value => (
                  <PinterestItem
                    key={value._id}
                    Post={value}
                    Auth={this.props.auth}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="dashborad">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapToStateProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapToStateProps,
  { getCurrentProfile }
)(Dashboard);
