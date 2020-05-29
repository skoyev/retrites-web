import { combineReducers } from "redux";

import { users } from "./users.reducer";
import { items } from "./items.reducer";
import { report } from "./report.reducer";
import { page }  from "./page.reducer";
import { summary }  from "./summary.reducer";
import { common }  from "./common.reducer";
import { message }  from "./message.reducer";

const rootReducer = combineReducers({
  users,
  items,
  report,
  page,
  summary,
  common,
  message
});

export default rootReducer;