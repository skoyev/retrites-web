import { combineReducers } from "redux";

import { reducer as retriteReducer } from "./Retrite";

export default combineReducers({
  retrite: retriteReducer,
});
