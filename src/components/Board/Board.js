import React from "react";
import "./Board.css";

import { connect } from "react-redux";

import { Square } from "../Square/Square";
// import { Player } from "../Player/Player";

export const Board = props => {
  const rows = props.gameMap.map((item, i) => {
    return (
      <div key={i} className="board-row">
        {Square(item)}
      </div>
    );
  });

  return (
    <div className="board">
      {/* {Player(player)} */}
      {rows}
    </div>
  );
};

const mapStateToProps = state => ({
  gameMap: state.game.map,
});

export const ConnectedBoard = connect(mapStateToProps)(Board);
