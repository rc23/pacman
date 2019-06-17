import React from "react";
import "./Nav.css";

import { bubble as Menu } from "react-burger-menu";

export const Nav = props => (
  <Menu {...props}>
    <a id="home" className="menu-item" href="/">
      Home
    </a>
    <a id="about" className="menu-item" href="/about">
      About
    </a>
    <a id="leaderboard" className="menu-item" href="/leaderboard">
      Leaderboard
    </a>
  </Menu>
);
