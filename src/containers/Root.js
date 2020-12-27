import React from "react";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import App from "../App";
import configureStore from "../store/configureStore";
import { fetchPostWatcher } from "../store/sagas/fetchPost";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({}, sagaMiddleware);

sagaMiddleware.run(fetchPostWatcher);

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
