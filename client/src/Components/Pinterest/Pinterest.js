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
    // console.log(this.props.profile);
    // if (this.props.profile.pinterest) {
    //   this.setState({
    //     list: this.state.list.concat(this.props.profile.pinterest)
    //   });
    // }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.profile.pinterest);

    if (nextProps.profile.pinterest) {
      // let copy = Object.assign(nextProps.profile.pinterest, this.state.list[]);
      // console.log("Here");
      // console.log(typeof nextProps.profile.pinterest);
      // console.log(typeof this.props.list);
      // this.setState(prevState => ({
      //   // console.log(typeof prevState.list);
      //   list: { ...prevState.list, ...nextProps.profile.pinterest }
      // }));
      // nextProps.profile.pinterest.map(value => {
      //   // console.log(value);
      //   this.setState({
      //     // console.log(typeof prevState.list);
      //     list: [...this.state.list, ...[value]]
      //   });
      // });
      let copy = [];
      for (var key in nextProps.profile.pinterest) {
        copy.push(nextProps.profile.pinterest[key]);
      }
      this.setState({
        list: this.state.list.concat(copy)
      });
      // this.setState({
      //   list: this.state.list.concat(Array.from({ length: 2 }))
      // });
    }
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.props.getPinterest();

      // this.setState({
      //   list: this.state.list.concat(this.props.profile.pinterest)
      // });
    }, 500);
  };
  render() {
    const { pinterest, loading } = this.props.profile;
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
            hasMore={true}>
            {this.state.list.map((value, index) => (
              <PinterestItem key={index} Post={value} />
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
