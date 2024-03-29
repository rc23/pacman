import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { configureStore } from "./store/";

import { Router } from "@reach/router";

import { Home } from "./containers/Home/Home";
import { About } from "./containers/About/About";
import { ConnectedLeaderboard } from "./containers/Leaderboard/Leaderboard";

import { Nav } from "./components/Nav/Nav";

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <Nav pageWrapId={"page-wrap"} outerContainerId={"App"} />

    <header className="App-header">
      <div className="App">
        <Router>
          <Home path="/" />
          <About path="about" />
          <ConnectedLeaderboard path="leaderboard" />
        </Router>
      </div>
    </header>
  </Provider>
);

export default App;
