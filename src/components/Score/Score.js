import React from "react";

export const Score = player => {
  return (
    <div>
      <span>{player.name}</span>
      <span>&nbsp;&nbsp;{player.score} pts.</span>
    </div>
  );
};
