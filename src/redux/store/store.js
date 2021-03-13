import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducers } from "../user/reducers";
import { uiReducers } from "../ui/reducers";
import { dataReducers } from "../data/reducers";

const rootReducers = combineReducers({
  user: userReducers,
  ui: uiReducers,
  data: dataReducers,
});

const middleWares = [thunk];
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
