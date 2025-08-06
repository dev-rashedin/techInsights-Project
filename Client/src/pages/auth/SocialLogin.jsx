import { FaGithub, FaGoogle } from 'react-icons/fa';

import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import axios from 'axios';
import { createOrUpdateUser } from '../../api/userApi';

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state || '/';

  const { googleLogin, githubLogin, loading, setLoading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      const user = result?.user;

      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        subscription: 'usual',
        role: 'user',
        status: 'verified',
        premiumToken: null,
      };

      createOrUpdateUser(userInfo);

      toast.success('Sign Up Successful');

      navigate(from);
    } catch (err) {
      //console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await githubLogin();

      const user = result?.user;

      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        subscription: 'usual',
        role: 'user',
        status: 'verified',
        premiumToken: null,
      };

      createOrUpdateUser(userInfo);

      toast.success('Sign In Successful');

      navigate(from);
    } catch (err) {
      //console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='mt-2 flex flex-col md:flex-row justify-between'>
        <button
          disabled={loading}
          onClick={handleGoogleLogin}
          className='cursor-pointer text-lg flex gap-3 items-center bg-deep-ocean 
          hover:bg-green-lantern text-pure-white px-8 py-2 rounded-md mb-2 md:mb-0 justify-center disabled:bg-gray-600 disabled:cursor-not-allowed'
        >
          <FaGoogle size={21} />
          <p className='text-base'>Google Login</p>
        </button>
        <button
          disabled={loading}
          onClick={handleGithubLogin}
          className='cursor-pointer text-lg flex gap-3 items-center bg-deep-ocean 
          hover:bg-green-lantern text-pure-white px-8 py-2 rounded-md justify-center disabled:bg-gray-600 disabled:cursor-not-allowed'
        >
          <FaGithub size={23} />
          <p className='text-base'>Github Login</p>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SocialLogin;
