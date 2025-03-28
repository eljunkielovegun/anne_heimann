'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getThemeSettings } from '@/lib/sanity';

// Create the theme context with default values
const ThemeContext = createContext({
  primaryColor: '#364182',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  accentColor: '#6c63ff',
  theme: 'light',
  isThemeLoaded: false
});

// Custom hook for accessing theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component that fetches and manages theme data
export function ThemeProvider({ children }) {
  const [themeState, setThemeState] = useState({
    primaryColor: '#364182',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    accentColor: '#6c63ff',
    theme: 'light',
    isThemeLoaded: false
  });

  const updateTheme = useCallback((themeData) => {
    // Set theme state for React components
    setThemeState({
      primaryColor: themeData?.primaryColor?.hex || '#364182',
      backgroundColor: themeData?.backgroundColor?.hex || '#ffffff',
      textColor: themeData?.textColor?.hex || '#333333',
      accentColor: themeData?.accentColor?.hex || '#6c63ff',
      theme: themeData?.defaultTheme || 'light',
      isThemeLoaded: true
    });
    
    // Apply CSS variables directly for immediate effect
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--color-primary', themeData?.primaryColor?.hex || '#364182');
      document.documentElement.style.setProperty('--color-background', themeData?.backgroundColor?.hex || '#ffffff');
      document.documentElement.style.setProperty('--color-text', themeData?.textColor?.hex || '#333333');
      document.documentElement.style.setProperty('--color-accent', themeData?.accentColor?.hex || '#6c63ff');
    }
  }, []);

  // Load theme settings on client side
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const themeData = await getThemeSettings();
        if (themeData) {
          updateTheme(themeData);
        } else {
          // Mark as loaded even if no theme data found
          setThemeState(prev => ({ ...prev, isThemeLoaded: true }));
        }
      } catch (error) {
        console.error('Error loading theme settings:', error);
        // Set isThemeLoaded to true even on error to avoid UI loops
        setThemeState(prev => ({ ...prev, isThemeLoaded: true }));
      }
    };

    loadThemeSettings();
    
    // Re-fetch theme on page refocus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadThemeSettings();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateTheme]);

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
}