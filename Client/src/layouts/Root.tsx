import { Outlet, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const Root = () => {
  const { theme } = useTheme();

  const location = useLocation();
  

  const noHeaderFooter =
    location.pathname.includes('login') || location.pathname.includes('register');

  return (
    <div
      className={`${theme} ${theme?.colors?.background} ${theme?.colors?.textPrimary}`}
    >
      <div
        className={`max-w-[1600px] mx-auto lg:px-4 font-raleway min-h-[89.5vh] `}
      >
        {noHeaderFooter || <Navbar />}     
          <Outlet />
      </div>
      {noHeaderFooter || <Footer />}
    </div>
  );
};
export default Root;
