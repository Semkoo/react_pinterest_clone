import React, { Component } from "react";
import { connect } from "react-redux";
import propType from "prop-types";
import Spinner from "../Common/Spinner";
import { getPinterest } from "../../Actions/profileActions";

import isEmpty from "../../Validation/is-empty";

import PinterestItem from "./PinterestItem";

import InfiniteScroll from "react-infinite-scroll-component";

import "./Pinterest.css";

class Pinterest extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.props.getPinterest();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.pinterest) {
      let copy = [];
      for (var key in nextProps.profile.pinterest) {
        copy.push(nextProps.profile.pinterest[key]);
      }
      this.setState({
        list: this.state.list.concat(copy)
      });
    }
  }

  fetchMoreData = () => {
    // setTimeout(() => {
    this.props.getPinterest();
    // }, 500);
  };
  render() {
    const { pinterest } = this.props.profile;
    let pinterestItems;
    // console.log(isEmpty(this.state.list));
    if (pinterest === null && isEmpty(this.state.list)) {
      pinterestItems = (
        <div style={{ float: "center" }}>
          <Spinner />;
        </div>
      );
    } else {
      if (pinterest.length > 0) {
        pinterestItems = (
          <InfiniteScroll
            dataLength={this.state.list.length}
            next={this.fetchMoreData}
            hasMore={true}>
            {this.state.list.map((value, index) => (
              <PinterestItem
                key={index}
                Post={value}
                Auth={{ isAuthorized: false }}
              />
            ))}
          </InfiniteScroll>
        );
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
