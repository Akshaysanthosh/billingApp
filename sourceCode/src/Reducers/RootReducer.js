import { combineReducers } from "redux";
import { billingReducer } from "./billingReducer"


const RootReducer = () =>
  combineReducers({
    billing: billingReducer
  });
export default RootReducer;
