import React, { createContext, useContext, useReducer } from "react";
// Prepare the datalayer
export const StateContext = createContext();

// Wrap our app
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
// Pull information
export const useStateValue = () => useContext(StateContext);
