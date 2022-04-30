import inputReducer from "./reducer/inputReducer";
import resultReducer from "./reducer/resultReducer";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  input: inputReducer,
  result: resultReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
