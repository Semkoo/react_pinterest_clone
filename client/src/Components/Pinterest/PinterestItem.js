import React, { Component } from "react";
import propType from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../Validation/is-empty";

class PinterestItem extends Component {
  render() {
    const { Item } = this.props.pinterestItem;
    console.log(Item);
    return (
      <div className="card-columns">
        <div className="card card-pin">
          <img
            className="card-img"
            src="http://www.bloomerslandscaping.net/images/background/bg01.jpg"
            alt="Card image"
          />
          <div className="overlay">
            {Item}
            <h3 className="card-title title">Some Title</h3>
            <div className="download">
              <a href="http://lorempixel.com/486/320/" download>
                <i className="fa fa-download" aria-hidden="true" />
              </a>
            </div>
            <div className="more">
              <a href="#!">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true" />{" "}
                More
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PinterestItem;
