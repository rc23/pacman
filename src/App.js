import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { store } from "./store";

import { Router } from "@reach/router";

import { ConnectedDashboard } from "./components/Dashboard";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";

function App() {
  console.log(store.getState());

  return (
    <Provider store={store}>
      <Nav pageWrapId={"page-wrap"} outerContainerId={"App"} />

      <header className="App-header">
        <Router>
          <Home path="/" />
          <ConnectedDashboard path="dashboard" />
        </Router>
      </header>
    </Provider>
  );
}

export default App;
