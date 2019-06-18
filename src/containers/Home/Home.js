import React, { useState } from "react";
import v4 from "uuid/v4";

import { ConnectedGame } from "../../components/Game/Game";

export const Home = () => {
  const [gameId, setGameId] = useState(v4());

  return (
    <div>
      <ConnectedGame key={gameId} startNewGame={() => setGameId(gameId + 1)} />
    </div>
  );
};
