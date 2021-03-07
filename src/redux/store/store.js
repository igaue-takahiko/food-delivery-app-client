import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducers } from "../auth/reducers";
import { uiReducers } from "../ui/reducers";

const rootReducers = combineReducers({
  auth: authReducers,
  ui: uiReducers,
});

const middleWares = [thunk];
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
