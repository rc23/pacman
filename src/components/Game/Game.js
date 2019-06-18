import React, { useState, useEffect, useCallback } from "react";
import "./Game.css";

import { connect } from "react-redux";

import { PlayAgain } from "../PlayAgain/PlayAgain";

import { GameMap } from "./GameMap";

export const Game = ({ game, startNewGame }) => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [gameStatus, setGameStatus] = useState("active");

  const [gameMap, setGameMap] = useState(GameMap);
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [rotation, setRotation] = useState("");
  const [score, setScore] = useState(0);

  const nrColumns = gameMap[0].length;
  const nrRows = gameMap.length;

  const handleUserKeyPress = useCallback(
    event => {
      const { keyCode } = event;

      let newGameMap = gameMap;

      const isMovingRight = keyCode === 39;
      const isMovingLeft = keyCode === 37;
      const isMovingDown = keyCode === 40;
      const isMovingUp = keyCode === 38;

      // stepped into a dot
      if (gameMap[y][x] === 2) {
        newGameMap[y][x] = 0;
        setGameMap(newGameMap);
        setScore(score + 1);
      }

      let nextSquareValue = null;

      if (isMovingRight) nextSquareValue = gameMap[y][x + 1];
      if (isMovingLeft) nextSquareValue = gameMap[y][x - 1];
      if (isMovingDown) nextSquareValue = gameMap[y + 1][x];
      if (isMovingUp) nextSquareValue = gameMap[y - 1][x];

      if (nextSquareValue !== 1) {
        if (isMovingRight && x < nrColumns) {
          setX(x + 1);
          setRotation("rotateZ(0turn)");
        }
        if (isMovingLeft && x > 0) {
          setX(x - 1);
          setRotation("rotateZ(0.50turn)");
        }
        if (isMovingDown && y < nrRows) {
          setY(y + 1);
          setRotation("rotateZ(0.25turn)");
        }
        if (isMovingUp && y > 0) {
          setY(y - 1);
          setRotation("rotateZ(-0.25turn)");
        }
      }

      if (x === 0 && isMovingLeft) {
        setX(nrColumns - 1);
      }
      if (x === nrColumns - 1 && isMovingRight) {
        setX(0);
      }
    },
    [gameMap, nrColumns, nrRows, score, x, y]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const styles = {
    left: (x * 100) / nrColumns + "%",
    top: (y * 100) / nrRows + "%",
    transition: "background 1ms linear",
    transform: rotation,
  };

  useEffect(() => {
    if (secondsLeft === 0) setGameStatus("lost");

    const interval = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <div className="game">
      <div className="body">
        <div className="timer">Time Remaining: {secondsLeft}</div>
        <div className="game-active">
          {gameStatus === "active" ? (
            <div className="board">
              <div className="pacman" style={styles} />
              {gameMap.map((row, i) => (
                <div key={i} className="board-row">
                  {row.map((item, i) => {
                    let classVal = "";
                    if (item === 0) classVal = "square";
                    if (item === 1) classVal = "square wall";
                    if (item === 2) classVal = "square dot";

                    return <div key={i} className={classVal} />;
                  })}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="game-lost">
          {gameStatus === "lost" ? (
            <PlayAgain onClick={startNewGame} gameStatus={gameStatus} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  game: state.game,
  startNewGame: ownProps.startNewGame,
});

export const ConnectedGame = connect(mapStateToProps)(Game);
