import io from "socket.io-client";
import get from "lodash/get";
import { getItem, storeItem } from "./storage";

const socket = io("http://localhost:4321/", { multiplex: false });
// const socket = {};

const configureSocket = (dispatch) => {
  console.log("configureSocket");

  socket.on("connect", () => {
    console.log("connected");
    const name = get(getItem("playerIdentity"), "name");

    if (name) {
      socket.emit("PLAYER_LOGIN", { name });
    } else {
      dispatch({ type: "GET_NAME" });
    }
  });
  socket.on("GAMESTATE_UPDATED", (state) => {
    console.log("GAMESTATE_UPDATED", { state });
    dispatch({ type: "UPDATE_RECEIVED", payload: state });
  });

  socket.on("PLAYER_UPDATED", (state) => {
    console.log("PLAYER_UPDATED socket", { state });
    dispatch({ type: "PLAYER_UPDATED", payload: state });
  });

  socket.on("PLAYER_LIST_UPDATE", (state) => {
    console.log("PLAYER_LIST_UPDATE", { state });
    dispatch({ type: "PLAYER_LIST_UPDATED", payload: state });
  });

  socket.on("PLAYER_LOGIN_SUCCESS", (gamestate) => {
    console.log("PLAYER_LOGIN_SUCCESS", gamestate);
    const store = getItem("playerIdentity") || {};
    storeItem("playerIdentity", { ...store, status: "gamestate" });
    dispatch({ type: "PLAYER_LOGGED_IN", payload: gamestate });
  });
  socket.on("PLAYER_LOGIN_FAIL", (gamestate) => {
    console.log("PLAYER_LOGIN_FAIL", gamestate);
    const status = get(getItem("playerIdentity"), "status");

    if (status === "authenticating") {
      dispatch({ type: "PLAYER_LOGIN_FAIL" });
    } else {
      dispatch({ type: "GET_NAME" });
    }
  });

  socket.on("disconnect", () => {
    console.log("you have been disconnected");
  });

  socket.on("reconnect", () => {
    console.log("you have been reconnected");
    // if (username) {
    //   socket.emit('add user', username);
    // }
  });
  return socket;
};

export const getCurrentPot = () => socket.emit("GET_CURRENT_POT");

export const sendNameToServer = (name) =>
  socket.emit("SEND_NAME_TO_SERVER", name);

export const sendPitchInToServer = (name) =>
  socket.emit("SOMEONE_PITCHED_IN", name);

export const sendGetOneToServer = (name) =>
  socket.emit("SOMEONE_GOT_ONE", name);

export default configureSocket;
