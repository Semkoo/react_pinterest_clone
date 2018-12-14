import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_ARTICLES
} from "./types";

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

//GET ALL POSTS/ARTICLES/PINTEREST
export const getPinterest = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/posts")
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_ARTICLES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ARTICLES,
        payload: {}
      })
    );
};

//GET SPECIFIC POST AND POST ID
export const getPinterestItemByID = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/post/${id}`)
    .then(res => {
      console.log(res);
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
export const addArticle = (articleData, history) => dispatch => {
  // Post this to link in profile
  axios
    .post("/api/profile/post/", articleData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    });
};

//Post new articles
export const deleteItem = (id, history) => dispatch => {
  // Post this to link in profile
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/api/profile/post/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
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
