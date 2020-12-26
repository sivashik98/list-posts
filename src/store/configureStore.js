import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./rootReducer";

const configureStore = (initialState, saga) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, saga)
  );
};

export default configureStore;
