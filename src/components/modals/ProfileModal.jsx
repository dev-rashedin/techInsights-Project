import PropTypes from 'prop-types';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Description,
} from '@headlessui/react';
import { Fragment } from 'react';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useAuth from './../../hooks/useAuth';

import { imageUpload } from '../../api/utils';
import { ImSpinner9 } from 'react-icons/im';

import { toast } from 'react-toastify';
import { updateProfileInfo } from '../../api/userApi';

/**
 *  
  <li>
<button onClick={() => setIsOpen(true)}>Profile</button>
<ProfileModal isOpen={isOpen} closeModal={closeModal} />
</li>

 */

const ProfileModal = ({ isOpen, closeModal, userData }) => {
  const [imageFile, setImageFile] = useState(null);

  const {
    updateUserProfile,
    loading,
    setLoading,
    updateUserPass,
    user,
    resetUserPass,
  } = useAuth();

  const { displayName, email, photoURL } = userData;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission handler
  const handleRegister = async ({ name }) => {
    try {
      setLoading(true);

      //  if new image is not uploaded take the already existing image
      let image_url = null;
      imageFile
        ? (image_url = await imageUpload(imageFile))
        : (image_url = photoURL);

      if (name !== displayName || imageFile) {
        const updatedInfo = {
          displayName: name,
          photoURL: image_url,
        };

        // updating info to db
        await updateProfileInfo(updatedInfo, email);

        // updating info to firebase
        await updateUserProfile(name, image_url);
      } else {
        toast.warn('Please update your info');
      }
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

  const handleResetPass = async () => {
    setLoading(true);

    try {
      const currentPassword = prompt('Enter your current password');
      //console.log(currentPassword)

      await updateUserPass(user, currentPassword);
      setLoading(false);
      toast.success('Password reset successful');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPass = async () => {
    setLoading(true);
    try {
      await resetUserPass(email);
      toast.success('Please check your email');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={closeModal} className='relative z-50'>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-1000'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-600'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <DialogPanel className='max-w-lg space-y-4 border bg-green-100 p-12 relative font-raleway rounded-md drop-shadow-md'>
            {/* close btn */}
            <button
              onClick={closeModal}
              className='absolute -top-3 -right-3 bg-green-lantern rounded-full p-2 cursor-pointer'
            >
              <MdClose color='white' size={20} />
            </button>
            <DialogTitle className='text-2xl pb-4 text-center font-wendy'>
              Update your profile
            </DialogTitle>

            {/* update form */}
            <form
              onSubmit={handleSubmit(handleRegister)}
              className=' space-y-2'
            >
              {/* name */}
              <div className='form-control'>
                <input
                  type='text'
                  {...register('name')} // Ensure this matches the Zod schema
                  placeholder='Name'
                  defaultValue={displayName}
                  className='input input-bordered'
                />
                {errors.name && (
                  <p className='text-red-500 mt-2'>{errors.name.message}</p>
                )}
              </div>

              {/* email */}
              <div className='form-control'>
                <input
                  type='email'
                  name='email'
                  readOnly
                  placeholder='Email'
                  defaultValue={email}
                  className='input input-bordered'
                />
                {errors.email && (
                  <p className='text-red-500 mt-2'>{errors.email.message}</p>
                )}
              </div>
              {/* photo */}
              <div className='flex justify-between items-center py-1 bg-white rounded-md'>
                <label
                  htmlFor='photo'
                  className='block mb-2 pt-2 pl-[14px] min-w-40 font-semibold'
                >
                  Select Image:
                </label>
                <input
                  type='file'
                  id='photo'
                  accept='image/*'
                  onChange={handleImageChange}
                />
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
                    'Update'
                  )}
                </button>
              </div>
            </form>

            <div className='flex justify-between'>
              <button
                onClick={handleResetPass}
                className='ml-2 cursor-pointer font-sevillana text-xl '
              >
                Reset password
              </button>
              <button
                onClick={handleForgetPass}
                className='ml-2 cursor-pointer font-sevillana text-xl '
              >
                Forget password?
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ProfileModal;
