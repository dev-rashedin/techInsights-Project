import { signInWithEmailAndPassword } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import  auth  from '../../firebase/firebase.config'; // your firebase config
import { useState } from 'react';
import sendEmail from './../../../../Server/src/utils/sendEmail';
import { useLocation, useNavigate } from 'react-router-dom';

const DemoAdminLogin = () => {
  const { logInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
 const location = useLocation();
   const navigate = useNavigate();
 
   const [loading, setLoading] = useState(false);
 
   const from = location?.state || '/';

  const loginDemoAdmin = async () => {
    setLoading(true);
    try {
      // 1. Login with demo account credentials
      const userCredential = await logInUser(
        'demo.admin@example.com',
        'DemoAdmin123!'
      );

      const user = userCredential.user;

      console.log('user inside demo admin', user);
      

      // 2. Call backend to assign admin claim
      const { data } = await axiosSecure.post('/set-admin', {
        uid: user.uid,
      });

      console.log('data inside demo admin', data.message, data.success);
      

      if (data?.success) {
        toast.success('Demo admin enabled!');
        // 3. Refresh token so new claim is available immediately
        await user.getIdToken(true);
         navigate(from);
      } else {
        toast.error(data?.message || 'Failed to set admin');
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error('Error setting demo admin:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={loginDemoAdmin}
      disabled={loading}
      className='btn bg-green-lantern text-pure-white
              hover:bg-deep-ocean text-base text-light-cream mt-5'
    >
      {loading ? (
        <ImSpinner9 className='animate-spin m-auto text-deep-ocean' />
      ) : (
        'Sign In as Demo Admin'
      )}
    </button>
  );
};

export default DemoAdminLogin;
