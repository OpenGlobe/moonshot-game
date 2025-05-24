import React, { createContext, useState } from 'react';
import { defaultTheme, retroTheme } from './themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === defaultTheme ? retroTheme : defaultTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
