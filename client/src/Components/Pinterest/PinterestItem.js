import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import propType from "prop-types";
import { connect } from "react-redux";
import { deleteItem } from "../../Actions/profileActions";
import { format } from "util";

class PinterestItem extends Component {
  onDeleteClick(id) {
    this.props.deleteItem(id, this.props.history);
  }

  render() {
    const { Post } = this.props;
    const { isAuthenticated, user } = this.props.Auth;

    const logedDisplay = (
      <div className="overlay">
        <h3 className="card-title title">{Post.title}</h3>
        <div className="delete">
          <button
            className="btn"
            onClick={this.onDeleteClick.bind(this, Post._id)}>
            <i className="fas fa-trash-alt" aria-hidden="true" />
          </button>
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

PinterestItem.propType = {
  deleteItem: propType.func.isRequired
};

export default connect(
  null,
  { deleteItem }
)(withRouter(PinterestItem));
