import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../providers/ThemeProvider';

const useTheme = (): ThemeContextType | null => {
  return useContext(ThemeContext);
};

export default useTheme;
