import { useState, useEffect } from 'react';

const THEME_STORAGE_KEY = 'hyperapps_theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
