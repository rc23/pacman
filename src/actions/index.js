export const toggleIsGameOver = isGameOver => ({
  type: "GAME_OVER",
  isGameOver,
});

export const updateDirection = direction => ({
  type: "UPDATE_DIRECTION",
  direction,
});

export const updateScore = () => ({
  type: "UPDATE_SCORE",
});

export const updateMap = map => ({
  type: "UPDATE_MAP",
  map,
});
