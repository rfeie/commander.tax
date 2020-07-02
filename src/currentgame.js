import React, { useState } from "react";
import AddPlayerForm from "./addplayerForm";
import PlayerInfo from "./playerinfo";

const AddPlayer = ({ addPlayer }) => {
  const [state, setState] = useState("start");
  switch (state) {
    case "start":
      return (
        <section>
          <span className="inline-flex rounded-md shadow-sm">
            <button
              onClick={(e) => {
                e.preventDefault();
                setState("opened");
              }}
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Add a Player
            </button>
          </span>
        </section>
      );

    case "opened":
      return (
        <AddPlayerForm
          addPlayer={(...args) => {
            addPlayer(...args);
            setState("start");
          }}
        />
      );
    default:
      return <section>fuck</section>;
  }
};
const AddPlayerSection = ({ children }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <svg
              className="h-6 w-6 text-white"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

const ActivePlayers = ({ users = [] }) => {
  return <>Active players: {users.map((user) => user).join(", ")}</>;
};

const CurrentGame = ({ gamestate, users, updatePlayer, addPlayer }) => {
  const { name } = gamestate;
  const [title] = name.split(":");
  const { players } = gamestate;
  return (
    <div className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
            <ActivePlayers users={users} />
          </p>
          <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            {title}
          </h3>
        </div>

        <div className="mt-10">
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.keys(players).map((key) => {
              const data = { ...players[key] };
              return <PlayerInfo updatePlayer={updatePlayer(key)} {...data} />;
            })}
            <AddPlayerSection>
              <AddPlayer addPlayer={addPlayer} />
            </AddPlayerSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentGame;
