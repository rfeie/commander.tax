import React from "react";
import { connect } from "react-redux";
import // getCurrentPot,
// sendNameToServer,
// sendPitchInToServer,
// sendGetOneToServer,
"./socket";
import "./styles/generated.css";
import Modal from "./modal";
import Loading from "./loading";
import GameState from "./gamestate";
const renderLookup = {
  login: Modal,
  loading: Loading,
  gamestate: GameState,
  fallback() {
    return <section>Nothing to see here</section>;
  },
};
const App = (props) => {
  const { mode, dispatch, gamestate, users } = props;
  const Comp = renderLookup[mode];
  console.log("testing this", process.env.REACT_APP_SOCKET_URL);

  console.log("App", dispatch);
  if (Comp) {
    return (
      <Comp
        submitName={({ name }) =>
          dispatch({ type: "NAME_SUBMITTED", payload: { name } })
        }
        users={users}
        newGame={() => dispatch({ type: "PRESSED_NEW_GAME" })}
        gamestate={gamestate}
        updatePlayerInfo={(playerInfo) => {
          dispatch({ type: "PLAYER_UPDATE", payload: playerInfo });
        }}
        updateGameState={(state) =>
          dispatch({ type: "GAMESTATE_UPDATED", payload: state })
        }
      />
    );
  }
  return renderLookup.fallback;
};

const mapStateToProps = (state) => ({
  pot: state.pot,
  name: state.name,
  names: state.names,
  users: state.users,
  snackbarIsOpen: state.snackbarIsOpen,
  mode: state.mode,
  gamestate: state.gamestate,
});

export default connect(mapStateToProps)(App);
// export default App;
