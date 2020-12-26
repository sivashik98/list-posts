import { combineReducers } from "redux";

import undoable from "redux-undo";
import { UNDO, REDO } from "./constants/constatns";

import posts from "./reducers/posts";
import app from "./reducers/app";
import topics from "./reducers/topics";

const config = { limit: 30, undoType: UNDO, redoType: REDO };

const rootReducer = combineReducers({
  app,
  posts: undoable(posts, config),
  topics,
});

export default rootReducer;
