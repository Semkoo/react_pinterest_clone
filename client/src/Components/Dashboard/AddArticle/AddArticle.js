import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

import TextFieldGroup from "../../Common/TextFieldGroup";
import TextAreaFieldGroup from "../../Common/TextAreaFieldGroup";
// import InputGroup from "../../Common/InputGroup";
import SelectListGroup from "../../Common/SelectListGroup";

// Import the action
import { addArticle } from "../../../Actions/profileActions";

class AddArticle extends Component {
  //State values
  constructor() {
    super();
    this.state = {
      display: "",
      handle: "",
      title: "",
      href_link: "",
      description: "",
      errors: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const addArticle = {
      display: this.state.display,
      handle: this.state.handle,
      title: this.state.title,
      href_link: this.state.href_link,
      description: this.state.description
    };
    // console.log(addArticle);
    this.props.addArticle(addArticle, this.props.history);
  };

  onChange = e => {
    this.setState({
      //Dynmaical based on the form filed
      [e.target.name]: e.target.value
    });
  };

  render() {
    // const { errors } = this.state;
    // console.log(errors);
    //Select Options for post status
    const options = [
      {
        label: "Show post public/private",
        value: null
      },
      {
        label: "public",
        value: "public"
      },
      {
        label: "private",
        value: "private"
      }
    ];

    return (
      <div className="create-post">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add a post</h1>
              <p className="lead text-center">Add anything you'd like</p>
              <small className="d-block pb-3">* required</small>
              <hr />
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Post Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  info="A unqiue handle for your post, this can't be changed later"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="display"
                  value={this.state.display}
                  onChange={this.onChange}
                  options={options}
                  info="Show the post to public or not yet"
                />
                <TextFieldGroup
                  placeholder="* Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  info="Title shown to public"
                />
                <TextFieldGroup
                  placeholder="* Image url link"
                  name="href_link"
                  value={this.state.href_link}
                  onChange={this.onChange}
                />
                <TextAreaFieldGroup
                  placeholder="A bried description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddArticle.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapToStateProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapToStateProps,
  { addArticle }
)(withRouter(AddArticle));
