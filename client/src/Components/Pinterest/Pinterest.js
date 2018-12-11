import React, { Component } from "react";
import { connect } from "react-redux";
import propType from "prop-types";
import Spinner from "../Common/Spinner";
import { getPinterest } from "../../Actions/profileActions";

import isEmpty from "../../Validation/is-empty";

import PinterestItem from "./PinterestItem";

import InfiniteScroll from "react-infinite-scroll-component";

import "./Pinterest.css";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};
class Pinterest extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.props.getPinterest();
    // console.log(this.props.profile);
    // if (this.props.profile.pinterest) {
    //   this.setState({
    //     list: this.state.list.concat(this.props.profile.pinterest)
    //   });
    // }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.profile.pinterest);
    console.log("Here");
    if (nextProps.profile.pinterest) {
      // let copy = Object.assign(nextProps.profile.pinterest, this.state.list[]);

      this.setState({
        list: this.state.list.concat(Array.from({ length: 2 }))
      });
    }
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.props.getPinterest();

      // this.setState({
      //   list: this.state.list.concat(this.props.profile.pinterest)
      // });
    }, 1500);
  };
  render() {
    const { pinterest, loading } = this.props.profile;
    // let arrayList = [];

    // arrayList.concat(pinterest);
    console.log(this.state.list);
    let pinterestItems;
    console.log(isEmpty(this.state.list));
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
            hasMore={true}
            height={100}
            loader={<Spinner />}>
            {this.state.list.map((value, index) => (
              <div style={style} key={index}>
                div -{value} #{index}
              </div>
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
          {pinterestItems}
          <div className="row">
            <div className="card-columns" />
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
