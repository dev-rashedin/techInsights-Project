import { Helmet } from 'react-helmet-async';
import PageTitle from '../../components/PageTitle';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { imageUpload, useImageFile } from '../../api/utils';
import { ImSpinner9 } from 'react-icons/im';
import { useOutletContext } from 'react-router-dom';
import { StatusCodes } from 'http-status-toolkit';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

type FormData = {
  publisher: string;
  logo: string;
}

const AddPublisher = () => {
   const { imageFile, handleImageChange } = useImageFile();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { isActive, handleToggle } : { isActive: boolean; handleToggle: () => void } = useOutletContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Form submission handler
  const handleRegister = async ({ publisher } : { publisher: string }) => {
    const image_url = await imageUpload(imageFile!);
    const publisherData = {
      title: publisher,
      logo: image_url,
    };

    try {
      setLoading(true);
      const res = await axiosSecure.post('/publishers', publisherData);
      console.log(res);

      if (res.status === StatusCodes.CREATED) {
        toast.success('Publisher created successfully');
        reset();
        setLoading(false);
      }
    } catch (err : any) {
      //console.log('Error:', err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div 
      onClick={isActive ? handleToggle : undefined}
      className='overflow-x-hidden -mt-40 lg:-mt-20'>
      <Helmet>
        <title>Tech Insights || Admin - Add Publisher</title>
      </Helmet>
      <PageTitle title='Add Publisher' />

      <div className=' max-w-xl mx-auto bg-transparent md:bg-gradient-to-br from-green-lantern/80 to-green-lantern/60 p-0 md:p-8 lg:p-10 rounded-xl'>
        {/*  form */}
        <form onSubmit={handleSubmit(handleRegister)} className=' space-y-2 w-ful'>
          {/* publisher */}
          <div className='form-control'>
            <input
              type='text'
              {...register('publisher')} // Ensure this matches the Zod schema
              placeholder='Publisher Name'
              required
              className='input input-bordered bg-faded-pearl placeholder:    font-semibold placeholder:text-gray-500'
            />
            {errors.publisher && (
              <p className='text-red-500 mt-2'>{errors.publisher.message as string}</p>
            )}
          </div>

          {/* logo */}
          <div className='flex justify-between items-center py-1 bg-faded-pearl rounded-md'>
            <label
              htmlFor='photo'
              className='block mb-2 pt-2 pl-[14px] min-w-40 font-semibold'
            >
              Select Logo:
            </label>
            <input
              type='file'
              required
              id='photo'
              accept='image/*'
              onChange={handleImageChange}
              className='-ml-4 md:ml-4'
            />
          </div>

          <div className='form-control mt-6'>
            <button
              disabled={loading}
              type='submit'
              className='btn bg-green-lantern text-white hover:bg-deep-ocean mt-2 border-transparent'
            >
              {loading ? (
                <ImSpinner9 className='animate-spin m-auto text-deep-ocean' />
              ) : (
                'Add Publisher'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddPublisher;
