import React, { useState, useEffect, useCallback } from "react";
import "./Game.css";

import { connect } from "react-redux";
import { updateScore } from "../../actions";

import { PlayAgain } from "../PlayAgain/PlayAgain";

import { getDefaultBoard } from "./GameBoard";

// TODO - Impossible to read this.
//        Create Board and a Pacman components to split logic

export const Game = props => {
  const [gameBoard, setGameBoard] = useState(getDefaultBoard());
  const [gameStatus, setGameStatus] = useState("active");
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [score, setScore] = useState(0);
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [rotation, setRotation] = useState("");

  const nrColumns = gameBoard[0].length;
  const nrRows = gameBoard.length;
  const MaxScore = 10;
  const updateScore = props.updateScore;

  const handleUserKeyPress = useCallback(
    event => {
      const { keyCode } = event;

      let newGameMap = gameBoard;

      const isMovingRight = keyCode === 39;
      const isMovingLeft = keyCode === 37;
      const isMovingDown = keyCode === 40;
      const isMovingUp = keyCode === 38;

      // stepped into a dot
      if (gameBoard[y][x] === 2) {
        newGameMap[y][x] = 0;
        setGameBoard(newGameMap);
        setScore(score + 1);
      }

      let nextSquareValue = null;

      if (isMovingRight) nextSquareValue = gameBoard[y][x + 1];
      if (isMovingLeft) nextSquareValue = gameBoard[y][x - 1];
      if (isMovingDown) nextSquareValue = gameBoard[y + 1][x];
      if (isMovingUp) nextSquareValue = gameBoard[y - 1][x];

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
    [gameBoard, nrColumns, nrRows, score, x, y]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    let interval = null;

    if (secondsLeft > 0 && gameStatus === "active") {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [secondsLeft, gameStatus]);

  useEffect(() => {
    if (secondsLeft === 0 && score < MaxScore) {
      setGameStatus("lost");
      updateScore(score);
      window.removeEventListener("keydown", handleUserKeyPress);
    } else if (secondsLeft !== 0 && score >= MaxScore) {
      setGameStatus("won");
      updateScore(score);
      window.removeEventListener("keydown", handleUserKeyPress);
    }
  }, [handleUserKeyPress, score, secondsLeft, updateScore]);

  const styles = {
    left: (x * 100) / nrColumns + "%",
    top: (y * 100) / nrRows + "%",
    transition: "background 1ms linear",
    transform: rotation,
  };

  return (
    <div className="game">
      <div className="body">
        <div className="timer">Time Remaining: {secondsLeft}</div>
        <div className="timer">Score: {score}</div>
        <div className="game-active">
          {gameStatus === "active" ? (
            <div className="board">
              <div className="pacman" style={styles} />
              {gameBoard.map((row, i) => (
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
          {gameStatus !== "active" ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateScore: score => dispatch(updateScore(score)),
  };
};

export const ConnectedGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
