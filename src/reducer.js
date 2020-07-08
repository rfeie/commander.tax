import { socket } from "./index";
import faker from "faker";
// eslint-disable-next-line no-unused-vars
import { getItem, storeItem } from "./storage";

const reducer = (
  state = {
    pot: 0,
    snackbarIsOpen: false,
    name: null,
    users: [],
    mode: "loading",
    gamestate: {},
  },
  action
) => {
  switch (action.type) {
    case "GAMESTATE_UPDATED":
      console.log("GAMESTATE_UPDATED", action.payload);
      socket && socket.emit("UPDATE_GAMESTATE", action.payload);

      break;
    case "UPDATE_RECEIVED":
      state = { ...state, gamestate: action.payload, mode: "gamestate" };

      break;

    case "PLAYER_UPDATE":
      console.log("PLAYER_UPDATE", action.payload);
      socket && socket.emit("PLAYER_UPDATE", action.payload);
      break;

    case "PLAYER_UPDATED":
      console.log("PLAYER_UPDATED", action.payload, state);
      const id = Object.keys(action.payload)[0];
      state = {
        ...state,
        gamestate: {
          ...state.gamestate,
          players: { ...state.gamestate.players, [id]: action.payload[id] },
        },
        mode: "gamestate",
      };
      break;
    case "PLAYER_LIST_UPDATED":
      state = { ...state, users: action.payload };
      break;
    case "PRESSED_NEW_GAME":
      // state = { ...state, mode: "game" };
      console.log("PRESSED_NEW_GAME");

      socket &&
        socket.emit("UPDATE_GAMESTATE", {
          name: `${faker.commerce.productName()}: ${faker.hacker.phrase()}`,
          players: {},
        });

      break;

    case "PLAYER_LOGGED_IN":
      state = { ...state, gamestate: action.payload, mode: "gamestate" };

      break;
    case "GET_NAME":
      state = { ...state, mode: "login" };

      break;

    case "NAME_SUBMITTED":
      state = { ...state, mode: "loading" };
      console.log("NAME_SUBMITTED", { action, socket });
      storeItem("playerIdentity", {
        name: action.payload.name,
        status: "authenticating",
      });

      socket && socket.emit("PLAYER_LOGIN", action.payload);

      break;
    default:
      break;
  }

  return state;
};

export default reducer;
