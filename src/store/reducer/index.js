import { combineReducers } from "redux";

import { users } from "./users.reducer";
import { items } from "./items.reducer";
import { leads } from "./leads.reducer";
import { report } from "./report.reducer";
import { page }  from "./page.reducer";
import { summary }  from "./summary.reducer";

const rootReducer = combineReducers({
  users,
  items,
  leads,
  report,
  page,
  summary
});

export default rootReducer;