import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers";
// import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';


const initialState = {};

const middleware = [thunk];
// const store = createStore(() => [], {}, applyMiddleware());
//Spreed operator
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
