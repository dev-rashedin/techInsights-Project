import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../assets/logo3.png';

const LoginRegisterTitle = ({ title }) => {
  return (
    <div>
      <Link to='/'>
        <img className='w-[70%] lg:w-[40%] mx-auto' src={logo} alt='' />
      </Link>
      <h2 className='text-4xl text-center tracking-wide mb-12 font-wendy'>
        {title}
      </h2>
    </div>
  );
};

LoginRegisterTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LoginRegisterTitle;
