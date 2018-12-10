import React, { Component } from "react";
import { connect } from "react-redux";
import propType from "prop-types";
import Spinner from "../Common/Spinner";
import { getPinterest } from "../../Actions/profileActions";

import PinterestItem from "./PinterestItem";

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
    // console.log(this.props);
    const { pinterest, loading } = this.props.profile;
    let pinterestItems;

    if (pinterest === null || loading) {
      pinterestItems = <Spinner />;
    } else {
      if (pinterest.length > 0) {
        pinterestItems = pinterest.map(itemValue => {
          itemValue.map(value => (
            <PinterestItem key={value._id} pinterestItem={value} />
          ));
        });

        // <PinterestItem pinterestItem={pinterest} />;
      } else {
        pinterestItems = <h4>No Pinterest Post were found...</h4>;
      }
    }

    return (
      <div className="pinterest">
        <div className="conainter">
          <div className="row">
            <div>{pinterestItems}</div>
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
