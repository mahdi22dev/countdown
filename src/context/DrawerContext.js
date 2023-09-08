"use client";
import React, { useState, useContext } from "react";
const DrawerContext = React.createContext();
const DrawerProvidor = ({ children }) => {
  const [openDrawer, setOpeDrawer] = useState(true);
  return (
    <DrawerContext.Provider
      value={{
        setOpeDrawer,
        openDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export { DrawerContext, DrawerProvidor };
