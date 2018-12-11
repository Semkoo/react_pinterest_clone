import React, { Component } from "react";
import { connect } from "react-redux";
import propType from "prop-types";
import Spinner from "../Common/Spinner";
import { getPinterest } from "../../Actions/profileActions";

import PinterestItem from "./PinterestItem";

import "./Pinterest.css";
class Pinterest extends Component {
  //   constructor() {
  //     super();
  //     this.pinterest = null;
  //   }
  //Get Posts right away
  componentDidMount() {
    this.props.getPinterest();
  }

  render() {
    const { pinterest, loading } = this.props.profile;
    let pinterestItems;

    if (pinterest === null || loading) {
      pinterestItems = <Spinner />;
    } else {
      if (pinterest.length > 0) {
        // let test = pinterest.map(value => {
        //   console.log(value);
        // });
        pinterestItems = pinterest.map(value => (
          <PinterestItem key={value._id} Post={value} />
        ));
        // pinterestItems = <h1>Hello</h1>;
        // <PinterestItem pinterestItem={pinterest} />;
      } else {
        pinterestItems = (
          <h4 className="text-center">No Pinterest Post were found...</h4>
        );
      }
    }

    return (
      <div className="pinterest">
        <div className="container">
          <div className="row">
            <div className="card-columns">{pinterestItems}</div>
          </div>
        </div>
      </div>
    );
  }
}
Pinterest.propType = {
  getPinterest: propType.func.isRequired,
  profile: propType.object.isRequired
};

const mapToStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapToStateToProps,
  { getPinterest }
)(Pinterest);
