import { defaultAppState, defaultGameState } from "../server";

export const users = (state = defaultAppState, action) => state;

export const game = (state = defaultGameState, action) => {
  switch (action.type) {
    case "UPDATE_SCORE":
      return {
        ...state,
        player: {
          ...state.player,
          score: action.payload.score,
        },
      };

    default:
      return state;
  }
};
