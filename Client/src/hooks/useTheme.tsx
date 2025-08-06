import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../providers/ThemeProvider';

const useTheme = (): ThemeContextType => {
   const context = useContext(ThemeContext);
   if (context === null) {
     throw new Error('useTheme must be used within a ThemeProvider');
   }
   return context;
};

export default useTheme;
