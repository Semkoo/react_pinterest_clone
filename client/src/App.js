import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Navbar, Landing, Footer } from "./Components/Layouts/";
import { Login, Register } from "./Components/Auth/"
import './App.css';


//MAIN CLASS/APPLICATION
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
            <Route exact path="/" component={Landing}/>
            <div className="container"> 
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
            </div>
           
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
