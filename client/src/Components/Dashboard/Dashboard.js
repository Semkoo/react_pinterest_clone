import React, { Component } from "react";
import { Link } from "react-router-dom";

import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../Actions/profileActions";

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
    // console.log(profile);
    let dashboardContent;

    if (profile === null || loading === true) {
      dashboardContent = <Spinner />;
    } else {
      // dashboardContent = <h1>Hello</h1>;
      //Check if logged in user has any posts posted
      // if (Object.keys(profile.posts).length > 0) {
      //   //Add New Posts
      //   dashboardContent = <h4>Display Posts</h4>;
      // } else {
      //User is logged in but has no posts
      dashboardContent = (
        <div>
          <p className="lead text-muted"> Welcome {user.name}</p>
          <p>You have not yet posted any posts, do add some if you'd like</p>
          <Link to="/create-post" className="btn btn-lg btn-info">
            {" "}
            Create A Post
          </Link>
        </div>
      );
      // }
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
