import { createContext, ReactNode, useEffect, useState } from 'react';


interface ThemeColors {
  primary: string;
  background: string;
  textPrimary: string;
}

interface Theme {
  colors: ThemeColors;
}
export interface ThemeContextType {
  theme: Theme; // or more specific if you have a theme object
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);



const themes : Record<'light' | 'dark', Theme> = {
  light: {
    colors: {
      primary: 'text-deep-ocean',
      background: 'bg-faded-pearl',
      textPrimary: 'text-charcoal-gray',
    },
  },
  dark: {
    colors: {
      primary: 'text-green-lantern',
      background: 'bg-midnight-gray',
      textPrimary: 'text-pure-white',
    },
  },
};




const ThemeProvider = ({ children } : ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeProvider;
