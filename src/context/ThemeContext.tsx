import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'midnight';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dvj_aashu_theme') as Theme;
      if (saved === 'light' || saved === 'midnight') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'midnight' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'midnight') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'midnight');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('dvj_aashu_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'midnight' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
