import { combineReducers } from "redux";

import { users } from "./users.reducer";
import { items } from "./items.reducer";

const rootReducer = combineReducers({
  users,
  items
});

export default rootReducer;