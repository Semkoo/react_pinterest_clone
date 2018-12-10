import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

//GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//Post new articles
export const createArticle = (profileData, history) => dispatch => {
  //Post this to link in profile
  // axios
  //   .post('/api/profie')
};

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
