"use client";
import React, { useState, useContext } from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [filterOption, setFilterOption] = useState({ filter: "all" });

  return (
    <AppContext.Provider
      value={{
        filterOption,
        setFilterOption,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
