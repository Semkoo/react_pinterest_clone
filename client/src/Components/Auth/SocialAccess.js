import React, { Component } from "react";
//Track history of states and redirect
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { verifyToken } from "../../Actions/authActions";

class SocialAccess extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    const { token } = this.props.match.params;
    this.props.verifyToken(token, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    return <div />;
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { verifyToken }
)(withRouter(SocialAccess));
