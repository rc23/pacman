import React from "react";
import { bubble as Menu } from "react-burger-menu";

import "./Nav.css";

export const Nav = props => (
  <Menu {...props}>
    <a id="home" className="menu-item" href="/">
      Home
    </a>
    <a id="about" className="menu-item" href="/about">
      About
    </a>
    <a id="dashboard" className="menu-item" href="/dashboard">
      Dashboard
    </a>
  </Menu>
);
