import { combineReducers } from "redux";

import { users } from "./users.reducer";
import { items } from "./items.reducer";
import { leads } from "./leads.reducer";

const rootReducer = combineReducers({
  users,
  items,
  leads
});

export default rootReducer;