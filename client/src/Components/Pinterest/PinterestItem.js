import React, { Component } from "react";
import propType from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../Validation/is-empty";

class PinterestItem extends Component {
  render() {
    const { Post } = this.props;
    // console.log(Post);
    return (
      <div className="card card-pin">
        <img className="card-img" src={Post.href_link} alt="Card image" />
        <div className="overlay">
          <h3 className="card-title title">{Post.title}</h3>
          {/* <div className="download">
              <a href="http://lorempixel.com/486/320/" download>
                <i className="fa fa-download" aria-hidden="true" />
              </a>
            </div> */}
          <div className="more">
            <a href="#!">
              <i className="fa fa-arrow-circle-o-right" aria-hidden="true" />{" "}
              More Info
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default PinterestItem;
