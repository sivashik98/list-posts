import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState, saga) => {
  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(saga)
  );
  const persistent = persistStore(store);

  return { store, persistent };
};

export default configureStore;
