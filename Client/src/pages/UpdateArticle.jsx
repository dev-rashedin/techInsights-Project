import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PageTitle from '../components/PageTitle';
import { axiosApi } from '../api/axiosApi';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { useState } from 'react';
import { imageUpload, useImageFile } from '../api/utils';
import swalAlert from '../api/swalAlert';
import { toast } from 'react-toastify';

const UpdateArticle = () => {
   const { imageFile, handleImageChange } = useImageFile();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  const { id } = useParams();
  
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  // fetching article data
  const {
    data: article = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['article', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/articles/${id}`);

      return data;
    },
    onError: (error) => {
      //console.log('Error fetching article:', error);
    },
  });

  // fetching publisher data
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // static tags options
  const tagsOptions = [
    { value: 'AI', label: 'AI' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Software', label: 'Software' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Programming', label: 'Programming' },
  ];

  // Handle form submission
  const handleUpdateArticle = async (data) => {
    const { title, description } = data;

    let image_url = null;
    imageFile
      ? (image_url = await imageUpload(imageFile))
      : (image_url = article.image_url);

    selectedPublisher
      ? setSelectedPublisher(selectedPublisher)
      : setSelectedPublisher(article.publisher);

    selectedTags.length > 0
      ? (data.tags = selectedTags.map((tag) => (data.tags = tag.value)))
      : (data.tags = article.tags);

    if (
      title !== article.title ||
      imageFile ||
      description !== article.description
    ) {
      // Prepare formData
      const formData = {
        title,
        description,
        image_url,
        tags: data.tags,
        publisher: selectedPublisher,
      };

      // console.log(formData);
      

      try {
        const res = await axiosSecure.patch(`update/${id}`, formData);
        console.log(res)

        if (res.data.modifiedCount) {
          toast.success('Update Successful');
          navigate('/my-articles');
        }
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }
    } else {
      swalAlert('warning', 'Please update article info');
    }
  };

  // Handle file input changes

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div>
      <Helmet>
        <title>Update Article || Tech Insights</title>
      </Helmet>
      <PageTitle title='Update Your Article' />

      <div className='border-2 border-dotted border-faded-pearl p-8 rounded-xl mx-8 lg:w-1/2 lg:mx-auto shadow-2xl -mt-4'>
        <form
          onSubmit={handleSubmit(handleUpdateArticle)}
          className=' space-y-2'
        >
          {/* Title */}
          <div className='form-control'>
            <input
              defaultValue={article.title}
              type='text'
              {...register('title')}
              placeholder='Title'
              className='input input-bordered'
            />
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
              {...register('image')}
              accept='image/*'
              id='image'
              onChange={handleImageChange}
            />
          </div>

          {/* Publisher & tags Dropdown */}

          <div className='flex gap-4 pt-[1px]'>
            {/* Tags Multi-Select */}
            <div className='form-control w-2/3'>
              <Select
                defaultInputValue={article.tags}
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
                    color: 'gray',
                  }),
                }}
              />
            </div>
            {/* publishers */}
            <div className='form-control'>
              <select
                defaultValue={article.publisher}
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
            </div>
          </div>

          {/* Description Textarea */}
          <div className='form-control'>
            <textarea
              rows={20}
              {...register('description')}
              placeholder='Description'
              className='textarea textarea-bordered'
              defaultValue={article.description}
            />
          </div>

          {/* Submit Button */}
          <div className='form-control mt-6'>
            <button
              type='submit'
              className='btn bg-green-lantern text-pure-white hover:bg-deep-ocean mt-2'
            >
              Update Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateArticle;
