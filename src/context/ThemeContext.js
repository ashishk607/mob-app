import React, { createContext, useState, useContext } from 'react';
import lightTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';
import natureTheme from '../themes/natureTheme';
import oceanTheme from '../themes/oceanTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = (themeName) => {
    switch (themeName) {
      case 'light':
        setTheme(lightTheme);
        break;
      case 'dark':
        setTheme(darkTheme);
        break;
      case 'nature':
        setTheme(natureTheme);
        break;
      case 'ocean':
        setTheme(oceanTheme);
        break;
      default:
        setTheme(lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);