import React, { Component } from "react";
// import logo from './logo.svg';

import jwt_decode from "jwt-decode";
import setAuthToken from "./Utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Actions/authActions";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { Navbar, Landing, Footer } from "./Components/Layouts/";
import { Login, Register, SocialAccess } from "./Components/Auth/";
import "./App.css";
import store from "./store";

//Check for a token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode the token and get the user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current profile
    //TODO ::

    //Redirect to login
    window.location.href = "./login";
  }
}

//MAIN CLASS/APPLICATION
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/SocialAccess/:token"
                component={SocialAccess}
              />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
