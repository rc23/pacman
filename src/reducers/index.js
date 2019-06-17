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
    default:
      return state;
  }
};
