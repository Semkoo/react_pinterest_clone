import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link,withRouter} from "react-router-dom";
import Spinner from "./../Common/Spinner";
import { format } from "util";
class PinterestProfile extends Component {
  render() {
    return (
      <div>
        <h1>TODO: Profile Post </h1>
      </div>
    );
  }
}
export default connect()(withRouter(PinterestProfile);
