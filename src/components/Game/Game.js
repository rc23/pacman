import React, { useState, useEffect } from "react";
import "./Game.css";

import { connect } from "react-redux";

import { ConnectedBoard } from "../Board/Board";
import { PlayAgain } from "../PlayAgain/PlayAgain";

import { toggleIsGameOver } from "../../actions";

export const Game = ({ ...props }) => {
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [gameStatus, setGameStatus] = useState("active");

  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);

      return () => clearTimeout(timerId);
    }
  });

  useEffect(() => {
    if (secondsLeft === 0) {
      setGameStatus("lost");
      props.toggleIsGameOver(true);
    }
  }, [secondsLeft, props]);

  const startNewGame = () => {
    props.startNewGame();
    props.toggleIsGameOver(false);
  };

  return (
    <div className="game">
      <div className="body">
        <div className="timer">Time Remaining: {secondsLeft}</div>
        <div className="game-active">
          {gameStatus === "active" && !props.isGameOver ? (
            <ConnectedBoard />
          ) : null}
        </div>
        <div className="game-lost">
          {gameStatus === "lost" && props.isGameOver ? (
            <PlayAgain onClick={startNewGame} gameStatus={gameStatus} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isGameOver: state.game.player.isGameOver,
});

const mapDispatchToProps = {
  toggleIsGameOver,
};

export const ConnectedGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
