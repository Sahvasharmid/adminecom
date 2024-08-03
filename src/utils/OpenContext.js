import React, { useState, createContext } from 'react';

const OpenContext = createContext();

export const OpenProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <OpenContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </OpenContext.Provider>
  );
};

export default OpenContext;
