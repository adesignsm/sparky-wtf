import React, { createContext, useState } from 'react';

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [entry, setEntry] = useState(false);
  const [HUDstate, setHUD] = useState(false);

  const updateEntry = (val) => {
    setEntry(val);
  }

  const updateHUD = (val) => {
    setHUD(val);
  }

  return (
    <StateContext.Provider value={{ entry, updateEntry, HUDstate, updateHUD }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
