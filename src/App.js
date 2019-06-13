import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { store } from "./store";

import { Router } from "@reach/router";

import { Nav } from "./components/Nav/Nav";
import { Home } from "./components/Home/Home";
import { About } from "./components/About/About";
import { ConnectedLeaderboard } from "./components/Leaderboard/Leaderboard";

function App() {
  console.log(store.getState());

  return (
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
}

export default App;
