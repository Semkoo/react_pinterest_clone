import React, { Component } from "react";

import { Pinterest } from "../Pinterest";

import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <Pinterest />
        </div>
      </div>
    );
  }
}

export default Landing;
