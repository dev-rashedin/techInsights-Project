import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '../../hooks/useAuth';
import LoginRegisterTitle from '../../components/LoginRegisterTitle';
import { imageUpload } from '../../api/utils';
import { ImSpinner9 } from 'react-icons/im';
import { createOrUpdateUser } from '../../api/userApi';
import swalAlert from '../../api/swalAlert';

// Zod schema for validation
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(
      /(?=.*[0-9])/,
      'Password must contain at least one numeric character'
    )
    .regex(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      'Password must contain at least one special character'
    ),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const { createUser, updateUserProfile, loading, setLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Form submission handler
  const handleRegister = async ({ name, email, password }) => {
    try {
      setLoading(true);

      const image_url = await imageUpload(imageFile);

      // return console.log(name, email, password, image_url);

      // 2. User registration
      await createUser(email, password);

      // 3. Save username and photo in Firebase
      await updateUserProfile(name, image_url);

      const userInfo = {
        displayName: name,
        email,
        photoURL: image_url,
        subscription: 'usual',
        role: 'user',
        status: 'verified',
        premiumToken: null,
      };

      createOrUpdateUser(userInfo);


      swalAlert('success', 'Registration  Successful');

      reset();
      navigate('/');
    } catch (err) {
      //console.log('Error:', err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle file input changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className='min-h-screen flex flex-col justify-center'>
      <Helmet>
        <title>Tech Insights || Register</title>
      </Helmet>
      <div className='px-4'>
        <LoginRegisterTitle title='Please Sign Up' />

        <form
          onSubmit={handleSubmit(handleRegister)}
          className='w-3/4 lg:w-1/2 mx-auto space-y-2'
        >
          <div className='form-control'>
            <input
              type='text'
              {...register('name')} // Ensure this matches the Zod schema
              placeholder='Name'
              className='input input-bordered'
            />
            {errors.name && (
              <p className='text-red-500 mt-2'>{errors.name.message}</p>
            )}
          </div>
          <div className='flex justify-between items-center py-1 bg-white rounded-md'>
            <label
              htmlFor='photo'
              className='block mb-2 pt-2 pl-[14px] min-w-40 font-semibold'
            >
              Select Image:
            </label>
            <input
              required
              type='file'
              id='photo'
              accept='image/*'
              onChange={handleImageChange}
            />
            {errors.photo && (
              <p className='text-red-500 mt-2'>{errors.photo.message}</p>
            )}
          </div>
          <div className='form-control'>
            <input
              type='email'
              {...register('email')} // Ensure this matches the Zod schema
              placeholder='Email'
              className='input input-bordered'
            />
            {errors.email && (
              <p className='text-red-500 mt-2'>{errors.email.message}</p>
            )}
          </div>
          <div className='form-control relative flex flex-col mt-3'>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')} // Ensure this matches the Zod schema
              placeholder='Password'
              autoComplete='new-password'
              className='input input-bordered'
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute top-4 right-8 cursor-pointer'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className='text-red-500 mt-2'>{errors.password.message}</p>
            )}
          </div>
          <div className='form-control mt-6'>
            <button
              disabled={loading}
              type='submit'
              className='btn bg-green-lantern text-pure-white hover:bg-deep-ocean mt-2'
            >
              {loading ? (
                <ImSpinner9 className='animate-spin m-auto text-deep-ocean' />
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
        <p className='text-center text-lg pt-6 pb-4'>
          Already have an account?{' '}
          <Link className='text-blue-600 font-bold' to='/login'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
