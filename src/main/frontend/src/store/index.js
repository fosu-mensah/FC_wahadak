import { createStore, applyMiddleware, compose } from "redux";
// middlewares
import thunkMiddleware from "redux-thunk";
// Import custom components
import reducers from "../redux/index";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);


export default store;
