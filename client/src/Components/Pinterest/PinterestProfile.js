import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "./../Common/Spinner";
import { getPinterestItemByID } from "../../Actions/profileActions";
class PinterestProfile extends Component {
  //Add lifecycle and
  componentDidMount() {
    if (this.props.match.params.postID) {
      this.props.getPinterestItemByID(this.props.match.params.postID);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const PostID = this.props.match.params.postID;
    let pinterestProfile;

    if (profile === null || loading) {
      pinterestProfile = <Spinner />;
    } else {
      pinterestProfile = (
        <div className="row">
          <div className="col-md-3 text-center">profile Avatar</div>
          <div className="col-md-9">
            <div className="card">
              <div className="row ">
                <div className="col-md-4">
                  <img
                    src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400"
                    className="w-100"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-block ">
                    <h4 className="card-title">Lorem ipsum dolor sit amet</h4>
                    <p className="card-text">
                      Consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.{" "}
                    </p>
                    <p className="card-text">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="card-columns" />
            </div>
          </div>
        </div>
      );
    }

    return <div className="">{pinterestProfile}</div>;
  }
}

PinterestProfile.propTypes = {
  getPinterestItemByID: propTypes.func.isRequired,
  profile: propTypes.object.isRequired
};

const mapToStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapToStateToProps,
  { getPinterestItemByID }
)(PinterestProfile);
