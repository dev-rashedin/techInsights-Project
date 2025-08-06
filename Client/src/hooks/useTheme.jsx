import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
