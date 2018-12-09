import React, { Component } from "react";
// import propTypes from "prop-types";

// import loginTab from "../../Utils/openWindow";

// const instance = axion.create({ baseURL: "http://localhost:5000" });
class GitHubLogin extends Component {
  // handleLogIn(e) {
  //   const msg = loginTab("http://localhost:5000/api/user/auth/github");
  //   msg.then(user => {
  //     console.log(user);
  //     // this.props.loginGithubAuth(user);
  //   });
  // }

  render() {
    return (
      <div>
        <a
          href="http://localhost:5000/api/user/auth/github/"
          // onClick={this.handleLogIn.bind(this)}
          type="button"
          className="btn btn-secondary btn-social btn-github btn-block mt-4">
          {" "}
          <i className="fab fa-github"> </i> Sign in with GitHub
        </a>
      </div>
    );
  }
}
// GitHubLogin.propTypes = {
//   loginGithubAuth: propTypes.func.isRequired
// };

// const mapStateToProps = () => {};
// GitHubLogin.propTypes = {
//   loginGithubAuth: propTypes.object
// };

// const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch => ({});

export default GitHubLogin;
