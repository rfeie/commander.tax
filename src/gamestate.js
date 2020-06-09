import React, { useState } from "react";
import Chrome from "./chrome";
import CurrentGame from "./currentgame";
const NewGameButton = ({ onClick }) => (
  <>
    <span className="inline-flex rounded-md shadow-sm">
      <button
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
      >
        Create a new game
      </button>
    </span>
  </>
);

const GameDisplay = ({ users, gamestate, updatePlayer, addPlayer }) => {
  const name = gamestate.name;
  if (name) {
    return (
      <CurrentGame
        updatePlayer={updatePlayer}
        users={users}
        addPlayer={addPlayer}
        gamestate={gamestate}
      />
    );
  }
  return <section>No game!</section>;
};

const GameState = ({ newGame, gamestate, users, updateGameState }) => {
  const addPlayer = ({ name, life }) => {
    updateGameState({
      ...gamestate,
      players: { ...gamestate.players, [name]: { life } }
    });
  };
  const updatePlayer = name => (data = {}) => {
    updateGameState({
      ...gamestate,
      players: { ...gamestate.players, [name]: { ...data } }
    });
  };
  return (
    <Chrome>
      <main>
        <GameDisplay
          users={users}
          gamestate={gamestate}
          addPlayer={addPlayer}
          updatePlayer={updatePlayer}
        />
        <NewGameButton onClick={newGame} />
      </main>
    </Chrome>
  );
};
export default GameState;
