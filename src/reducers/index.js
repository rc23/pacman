import { defaultAppState, defaultGameState } from "../server";

export const users = (state = defaultAppState, action) => state;

export const game = (state = defaultGameState, action) => {
  switch (action.type) {
    case "GAME_OVER":
      return {
        ...state,
        player: {
          ...state.player,
          isGameOver: action.isGameOver,
        },
      };
    case "UPDATE_DIRECTION":
      return {
        ...state,
        player: {
          ...state.player,
          direction: action.direction,
        },
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        player: {
          ...state.player,
          score: state.score++,
        },
      };

    default:
      return state;
  }
};
