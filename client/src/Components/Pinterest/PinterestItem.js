import React, { Component } from "react";
import { Link } from "react-router-dom";



class PinterestItem extends Component {
  render() {
    const { Post } = this.props;
    const { isAuthenticated, user } = this.props.Auth;

    const logedDisplay = (
      <div className="overlay">
        <h3 className="card-title title">{Post.title}</h3>
        <div className="delete">
          <a download>
            <i className="fas fa-trash-alt" aria-hidden="true" /> Delete
          </a>
        </div>
        <div className="more">
          <Link to={`/post/${Post._id}`}>
            <i className="fas fa-share" aria-hidden="true" /> Share
          </Link>
        </div>
      </div>
    );

    const guestDisplay = (
      <div className="overlay">
        <h3 className="card-title title">{Post.title}</h3>
        <div className="more">
          <Link to={`/post/${Post._id}`}>
            <i className="fas fa-arrow-circle-right" aria-hidden="true" />
            More Info
          </Link>
        </div>
      </div>
    );

    return (
      <div className="card card-pin">
        <img className="card-img" src={Post.href_link} alt="Card image" />
        {isAuthenticated ? logedDisplay : guestDisplay}
      </div>
    );
  }
}
export default PinterestItem;
