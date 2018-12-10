import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register Action
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/register", userData)
    .then(
      res => history.push("/login")
      // dispatch({
      //   type: GET_,
      //   payload: res
      // })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

  //   return {
  //     type: TEST_DISPATCH,
  //     payload: userData
  //   };
};

//Validate the token
export const verifyToken = (tokenData, history) => dispatch => {
  // console.log(tokenData);
  axios
    .get("/api/user/authSocial", {
      headers: {
        Authorization: "Bearer " + tokenData
      }
    })
    .then(response => {
      // delete axios.defaults.headers.common["Authorization"];
      const resetToken = "Bearer " +tokenData ;
      // Set to localStorage
      localStorage.setItem("jwtToken", resetToken);
      // Set to axion auth header
      setAuthToken(resetToken);
      //Decode token to get user data
      const decode = jwt_decode(resetToken);
      //Set current user
      dispatch(setCurrentUser(decode));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
      history.push("/login");
      // console.log(error);
    });
};

//Login Get User - token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/user/login", userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data;
      // Set to localStorage
      localStorage.setItem("jwtToken", token);
      // Set to axion auth header
      setAuthToken(token);
      //Decode token to get user data
      const decode = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decode));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// //Login GithubAuth - Get User and token
// export const loginGithubAuth = () => dispatch => {
//   axios
//     .get("/auth/github")
//     .then(
//       res => {
//         console.log("here");

//         //Save to localStorage
//         const { token } = res.data;
//         // Set to localStorage
//         localStorage.setItem("jwtToken", token);
//         // Set to axion auth header
//         setAuthToken(token);
//         //Decode token to get user data
//         const decode = jwt_decode(token);
//         //Set current user
//         dispatch(setCurrentUser(decode));
//       }
//       // dispatch({
//       //   type: GET_,
//       //   payload: res
//       // })
//     )
//     .catch(err => {
//       console.log("here");
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Logout the user
export const logoutUser = () => dispatch => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  //Set the current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  //Redirect to home
  window.location.href = "/";
};
