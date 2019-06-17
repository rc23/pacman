import React, { useState, useEffect, useCallback } from "react";

const checkCollision = (x, y, direction) => {
  let board = window.appState.board;
  let value = null;

  if (direction === "right") value = board[y][x + 1];
  if (direction === "left") value = board[y][x - 1];
  if (direction === "bottom") value = board[y + 1][x];
  if (direction === "top") value = board[y - 1][x];
  return value;
};

const checkTunnel = (x, y, dir) => {
  let xMax = window.appState.board[0].length - 1;
  if (x === 0 && dir === "left") window.appState.player.x = xMax;
  if (x === xMax && dir === "right") window.appState.player.x = 0;
};

export const Player = player => {
  const [direction, setDirection] = useState("");

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;

    // dispatch on keypress
    if (keyCode === 37) setDirection("left");
    if (keyCode === 38) setDirection("up");
    if (keyCode === 39) setDirection("right");
    if (keyCode === 40) setDirection("down");
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  let x = player.x;
  let y = player.y;
  let styles = {};

  let collisionVal = checkCollision(x, y, direction);

  if (collisionVal !== 1) {
    if (direction === "right" && x < 27) x += 1;
    if (direction === "left" && x > 0) x -= 1;
    if (direction === "bottom" && y < 30) y += 1;
    if (direction === "top" && y > 0) y -= 1;

    window.appState.player.x = x;
    window.appState.player.y = y;

    if (collisionVal === 2) {
      window.appState.player.score += 1;
      window.appState.board[y][x] = 0;
    }
  }

  var xPercent = (x * 100) / 28;
  var yPercent = (y * 100) / 31;

  styles = {
    left: xPercent + "%",
    top: yPercent + "%",
    transition: "all 200ms linear",
  };

  checkTunnel(x, y, direction);

  if (x <= 0 || x >= 27) styles.display = "none";

  return <div className="player" style={styles} />;
};
