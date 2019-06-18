import React from "react";
import "./PlayAgain.css";

export const PlayAgain = props => (
  <div className="game-done">
    <div
      className="message"
      style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
    >
      {props.gameStatus === "lost" ? "Game Over" : "Congrats"}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
);
