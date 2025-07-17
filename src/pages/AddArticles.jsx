import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';
import { useQuery } from '@tanstack/react-query';
import { axiosApi } from '../api/axiosApi';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { useState } from 'react';
import { imageUpload } from '../api/utils';
import { toast } from 'react-toastify';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { StatusCodes } from 'http-status-toolkit';

const AddArticles = () => {
  const [imageFile, setImageFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  // getting publisher data
  const { data: publisherData = [] } = useQuery({
    queryKey: ['publishers'],

    queryFn: async () => {
      const { data } = await axiosApi.get('/publishers');

      return data;
    },
    onError: (error) => {
      //console.log('Error fetching user:', error);
    },
  });

  // static tags options
  const tagsOptions = [
    { value: 'AI', label: 'AI' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Software', label: 'Software' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Programming', label: 'Programming' },
  ];

  // Handle form submission
  const handlePostArticle = async (data) => {
    const { title, description } = data;

    data.tags = selectedTags.map((tag) => tag.value);

    const image_url = await imageUpload(imageFile);

    // Prepare formData
    const articleData = {
      title,
      description,
      image_url,
      tags: data.tags,
      publisher: selectedPublisher,
      posted_by: user?.email.split('.')[0],
      posted_time: new Date().toLocaleDateString(),
      writers_email: user?.email,
      view_count: 0,
      isPremium: 'no',
      status: 'pending',
    };


    try {
      setLoading(true);
      const res = await axiosSecure.post('/articles', articleData);
      console.log(res)

      if (res.status === StatusCodes.CREATED) {
        toast.success('Article posted successfully');
        reset();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
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
    <div className='h-[80vh]  flex flex-col justify-center items-center'>
      <Helmet>
        <title>Tech Insights || Add Articles</title>
      </Helmet>
      <PageTitle title='Add Articles' />
      {/* form */}
      <div className='border-2 border-dotted border-faded-pearl p-4 md:p-8 rounded-xl mx-8 lg:w-1/2 lg:mx-auto shadow-2xl '>
        <form onSubmit={handleSubmit(handlePostArticle)} className='w-80 md:w-full space-y-2 xl:space-y-3'>
          {/* Title */}
          <div className='form-control'>
            <input
              type='text'
              {...register('title', { required: 'Title is required' })}
              placeholder='Title'
              className='input input-bordered'
            />
            {errors.title && (
              <p className='text-red-500 mt-2'>{errors.title.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className='flex justify-between items-center py-1 bg-white rounded-md'>
            <label
              htmlFor='image'
              className='block mb-2 pt-2 pl-[14px] min-w-40  text-gray-600'
            >
              Select Image:
            </label>
            <input
              type='file'
              required
              {...register('image', { required: 'Image is required' })}
              accept='image/*'
              id='image'
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className='text-red-500 mt-2'>{errors.image.message}</p>
            )}
          </div>

          {/* Publisher & tags Dropdown */}

          <div className='flex flex-col md:flex-row gap-4 pt-[1px]'>
            {/* Tags Multi-Select */}
            <div className='form-control md:w-2/3'>
              <Select
                options={tagsOptions}
                isMulti
                onChange={setSelectedTags}
                placeholder='Select Tags'
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: '5px',
                    borderRadius: '10px',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: 'gray', // Custom placeholder color
                  }),
                }}
              />
              {selectedTags.length === 0 && (
                <p className='text-red-500 mt-2'>
                  At least one tag is required
                </p>
              )}
            </div>
            {/* publishers */}
            <div className='form-control'>
              <select
                {...register('publisher', {
                  required: 'Publisher is required',
                })}
                className='input input-bordered'
                onChange={(e) => setSelectedPublisher(e.target.value)}
              >
                <option value=''>Select Publisher</option>
                {publisherData.map((publisher) => (
                  <option key={publisher._id} value={publisher.title}>
                    {publisher.title}
                  </option>
                ))}
              </select>
              {errors.publisher && (
                <p className='text-red-500 mt-2'>{errors.publisher.message}</p>
              )}
            </div>
          </div>

          {/* Description Textarea */}
          <div className='form-control'>
            <textarea
              {...register('description', {
                required: 'Description is required',
              })}
              placeholder='Description'
              className='textarea textarea-bordered h-32 overflow-auto'
            />
            {errors.description && (
              <p className='text-red-500 mt-2'>{errors.description.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className='form-control mt-6'>
            <button
              disabled={loading}
              type='submit'
              className='btn bg-green-lantern text-pure-white hover:bg-deep-ocean mt-2'
            >
              Submit Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddArticles;
