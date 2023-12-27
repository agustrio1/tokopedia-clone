import React, { createContext, useEffect, useState, useContext } from "react";

const HeaderContext = createContext();

export const useHeaderContext = () => useContext(HeaderContext);

export const HeaderProvider = ({ children }) => {
  const [isNav, setIsNav] = useState(false);
  const [headerBackground, setHeaderBackground] = useState({
    startColor: "transparent",
    endColor: "transparent",
  });

  const addScrollListener = (callback) => {
    window.addEventListener("scroll", callback);
  };

  const removeScrollListener = (callback) => {
    window.removeEventListener("scroll", callback);
  };

  const openNav = () => {
    setIsNav(!isNav);
  };

  const closeNav = () => {
    setIsNav(false);
  };

  const updateHeaderBackground = (scrollPosition) => {
    const headerHeight = 60;
    const alphaColorHeader = Math.min(scrollPosition / headerHeight, 1);
    const startColor = "rgba(255, 255, 255, 0)";
    const endColor = `rgba(255, 255, 255, ${alphaColorHeader})`;

    setHeaderBackground({ startColor, endColor });
  };

  return (
    <HeaderContext.Provider
      value={{
        isNav,
        openNav,
        closeNav,
        headerBackground,
        updateHeaderBackground,
        addScrollListener,
        removeScrollListener,
      }}>
      {children}
    </HeaderContext.Provider>
  );
};
