import { signInWithEmailAndPassword } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import { ImSpinner9 } from 'react-icons/im';

const DemoAdminLogin = () => {
  const { logInUser, loading, setLoading } = useAuth();

  const loginDemoAdmin = async () => {
    setLoading(true);
    try {
      await logInUser('demo.admin@example.com', 'DemoAdmin123!');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type='submit'
      disabled={loading}
      className='btn bg-green-lantern text-pure-white
              hover:bg-deep-ocean
              hover text-base text-light-cream'
    >
      {loading ? (
        <ImSpinner9 className='animate-spin m-auto text-deep-ocean' />
      ) : (
        'Sign In'
      )}
    </button>
  );
};
export default DemoAdminLogin;
