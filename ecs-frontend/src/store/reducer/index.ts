import { combineReducers } from "redux";
import { cart } from "./productReducer";
import { order } from "./orderreducer";

export const reducer = combineReducers({
  cart,
  order,
});
