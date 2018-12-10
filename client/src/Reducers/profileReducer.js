import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ARTICLES
} from "../Actions/types";

const initialState = {
  profile: null,
  pinterest: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ARTICLES:
      console.log(action.payload);
      return {
        ...state,
        pinterest: action.payload,
        loading: false
      };
    case GET_PROFILE:
      // console.log(action.payload);
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: {}
      };
    default:
      return state;
  }
}
