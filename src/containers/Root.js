import React from "react";
import { Provider } from "react-redux";

import createSagaMiddleware from "redux-saga";

import configureStore from "../store/configureStore";
import App from "../App";
import { fetchPostWatcher } from "../store/sagas/fetchPost";

const saga = createSagaMiddleware();

const store = configureStore({}, saga);
console.log(store.getState());

saga.run(fetchPostWatcher);

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
