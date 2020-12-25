import { combineReducers } from "redux";

import posts from "./reducers/posts";
import app from "./reducers/app";
import topics from "./reducers/topics";

import { test } from "./reducers/posts";

const rootReducer = combineReducers({
  app,
  posts,
  topics,
  test,
});

export default rootReducer;
