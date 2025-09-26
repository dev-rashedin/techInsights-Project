import useAuth from '../../hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DemoAdminLogin = () => {
  const { logInUser } = useAuth();
 const location = useLocation();
   const navigate = useNavigate();
 
   const [loading, setLoading] = useState(false);
 
   const from = location?.state || '/';

  // const loginDemoAdmin = async () => {
  //   setLoading(true);
  //   try {
  //     // 1. Login with demo account credentials
  //     const userCredential = await logInUser(
  //       'demo.admin@example.com',
  //       'DemoAdmin123!'
  //     );

  //     navigate(from);

  //     const user = userCredential.user;

  //     const idToken = await user.getIdToken(true);
  //     console.log('idToken inside demo admin', idToken);
      
  //       localStorage.setItem('access-token', idToken);

  //     console.log('user inside demo admin', user);
      

  //     // 2. Call backend to assign admin claim
  //     const { data } = await axiosSecure.post('/set-admin', {
  //       uid: user.uid,
  //     });

  //     console.log('data inside demo admin', data.message, data.success);
      

  //     if (data?.success) {
  //       toast.success('Demo admin enabled!');
  //       // 3. Refresh token so new claim is available immediately
  //       await user.getIdToken(true);
  //        navigate(from);
  //     } else {
  //       toast.error(data?.message || 'Failed to set admin');
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message);
  //     console.error('Error setting demo admin:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const loginDemoAdmin = async () => {
    setLoading(true);
    try {
      // 1. Login with demo account credentials
      const userCredential = await logInUser(
        'rustark.winterfell@gmail.com',
        'Hello@123'
      );

      navigate(from);
    }
    catch (error: any) {
      toast.error(error.message);
      console.error('Error setting demo admin:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='w-3/4 lg:w-1/2 max-w-xl mx-auto'>
      <button
        onClick={loginDemoAdmin}
        disabled={loading}
        className='btn bg-green-lantern text-pure-white
              hover:bg-deep-ocean text-base text-light-cream mb-5 w-full'
      >
        {loading ? (
          <ImSpinner9 className='animate-spin m-auto text-deep-ocean' />
        ) : (
          'Sign In as Demo Admin'
        )}
      </button>
    </div>
  );
};

export default DemoAdminLogin;
