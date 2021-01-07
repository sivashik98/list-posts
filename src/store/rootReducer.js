import { combineReducers } from "redux";
import undoable, { includeAction, ActionTypes } from "redux-undo";

import {
  FETCH_POST_SUCCESS,
  DELETE_POST,
  TOGGLE_LIKE_POST,
  REORDER_POSTS,
} from "./constants";
import posts from "./reducers/posts";
import app from "./reducers/app";
import topics from "./reducers/topics";

const undoableConfig = {
  limit: 30,
  undoType: ActionTypes.UNDO,
  redoType: ActionTypes.REDO,
  filter: includeAction([
    FETCH_POST_SUCCESS,
    REORDER_POSTS,
    DELETE_POST,
    TOGGLE_LIKE_POST,
  ]),
};

const rootReducer = combineReducers({
  app,
  posts: undoable(posts, undoableConfig),
  topics,
});

export default rootReducer;
