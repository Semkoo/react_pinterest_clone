import React, { Component } from "react";
import { connect } from "react-redux";
import propType from "prop-types";
import { Link, withRouter } from "react-router-dom";

class Articles extends Component {
  render() {
    const articles = this.props.Posts.map((article, index) => (
      <tr key={article._id}>
        <td>{index + 1}</td>
        <td>{article.title}</td>
        <td>{article.display}</td>
        <td>{article.handle}</td>
        <td>
          {/* TODO: profileAction viewArticle with this id onto top */}
          <button className="btn btn-danger">Modify</button>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className="btn-group mb-4" role="group">
          <Link to="/add-article" className="btn btn-light">
            <i className="fas fa-passport text-info mr-1" />
            Add Article
          </Link>
        </div>
        <h4 className="mb-4 text-center">List of Articles</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Active</th>
              <th>Handle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{articles}</tbody>
        </table>
      </div>
    );
  }
}
export default connect(null)(withRouter(Articles));
