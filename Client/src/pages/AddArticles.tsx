import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';
import { useQuery } from '@tanstack/react-query';
import { axiosApi } from '../api/axiosApi';
import { useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import { useState } from 'react';
import { imageUpload } from '../api/utils';
import { toast } from 'react-toastify';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { StatusCodes } from 'http-status-toolkit';
import { IPublisher } from '../../interface';

type TagOption = {
  value: string;
  label: string;
};

interface FormData {
  title: string;
  image: FileList;
  description: string;
  publisher: string;
}

const AddArticles = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const { data: publisherData = [] } = useQuery<IPublisher[]>({
    queryKey: ['publishers'],
    queryFn: async () => {
      const { data } = await axiosApi.get('/publishers');
      return data;
    },
  });

  const tagsOptions: TagOption[] = [
    { value: 'AI', label: 'AI' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Software', label: 'Software' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Programming', label: 'Programming' },
  ];

  const handlePostArticle = async (data: FormData) => {
    const { title, description } = data;

    if (selectedTags.length === 0) {
      toast.error('Please select at least one tag');
      return;
    }

    if (!selectedPublisher) {
      toast.error('Please select a publisher');
      return;
    }

    if (!imageFile) {
      toast.error('Please upload an image');
      return;
    }

    const image_url = await imageUpload(imageFile);

    const articleData = {
      title,
      description,
      image_url,
      tags: selectedTags.map((tag) => tag.value),
      publisher: selectedPublisher,
      posted_by: auth.user?.email?.split('@')[0],
      posted_time: new Date().toLocaleDateString(),
      writers_email: auth.user?.email,
      view_count: 0,
      isPremium: 'no',
      status: 'pending',
    };

    try {
      setLoading(true);
      const res = await axiosSecure.post('/articles', articleData);

      if (res.status === StatusCodes.CREATED) {
        toast.success('Article posted successfully');
        reset();
        setSelectedTags([]);
        setSelectedPublisher(null);
        setImageFile(null);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  return (
    <div className='h-[80vh] flex flex-col justify-center items-center'>
      <Helmet>
        <title>Tech Insights || Add Articles</title>
      </Helmet>
      <PageTitle title='Add Articles' />

      <div className='border-2 border-dotted border-faded-pearl p-4 md:p-8 rounded-xl mx-8 lg:w-1/2 lg:mx-auto shadow-2xl'>
        <form
          onSubmit={handleSubmit(handlePostArticle)}
          className='w-80 md:w-full space-y-2 xl:space-y-3'
        >
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
              className='block mb-2 pt-2 pl-[14px] min-w-40 text-gray-600'
            >
              Select Image:
            </label>
            <input
              type='file'
              {...register('image', { required: 'Image is required' })}
              accept='image/*'
              id='image'
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className='text-red-500 mt-2'>{errors.image.message}</p>
            )}
          </div>

          {/* Tags and Publisher */}
          <div className='flex flex-col md:flex-row gap-4 pt-[1px]'>
            <div className='form-control md:w-2/3'>
              <Select
                options={tagsOptions}
                isMulti
                onChange={(val) => setSelectedTags(val as TagOption[])}
                placeholder='Select Tags'
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: '5px',
                    borderRadius: '10px',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: 'gray',
                  }),
                }}
              />
              {selectedTags.length === 0 && (
                <p className='text-red-500 mt-2'>
                  At least one tag is required
                </p>
              )}
            </div>

            <div className='form-control'>
              <select
                {...register('publisher', {
                  required: 'Publisher is required',
                })}
                className='input input-bordered'
                onChange={(e) => setSelectedPublisher(e.target.value)}
              >
                <option value=''>Select Publisher</option>
                {publisherData.map((publisher: IPublisher) => (
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

          {/* Description */}
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
