import { createStore, combineReducers } from "redux";
// import throttle from "lodash/throttle";

// import { loadState, saveState } from "../localStorage";

import { users, game } from "../reducers/";

export const configureStore = () => {
  // const persistedState = loadState();

  const combinedReducers = combineReducers({ users, game });

  const store = createStore(
    combinedReducers,
    // persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  // store.subscribe(
  //   throttle(() => {
  //     saveState(store.getState());
  //   }),
  //   1000
  // );

  return store;
};
