import React, { createContext, useReducer, useContext } from "react";
import { userInitialState, userActions } from "./helpers/userActions";

// combine initial states
const initialState = {
  port: 4000,
  api: "crm",
  ...userInitialState
};

const StoreContext = createContext(initialState);

// combine actions
const Actions = {
  ...userActions
};

const reducer = (state, action) => {
  const act = Actions[action.type];
  const update = act(state, action.payload);
  return { ...state, ...update };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = store => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};
