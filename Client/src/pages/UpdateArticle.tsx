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
import { IPublisher } from '../../interface';

interface Article {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  publisher: string;
}

interface TagOption {
  value: string;
  label: string;
}

interface FormInput {
  title: string;
  description: string;
  image?: FileList;
  publisher: string;
}

const tagsOptions: TagOption[] = [
  { value: 'AI', label: 'AI' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Software', label: 'Software' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Programming', label: 'Programming' },
];

const UpdateArticle = () => {
  const { imageFile, handleImageChange } = useImageFile();
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(
    null
  );

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: article = {} as Article,
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
  });

  const { data: publisherData = [] } = useQuery<IPublisher[]>({
    queryKey: ['publishers'],
    queryFn: async () => {
      const { data } = await axiosApi.get('/publishers');
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const handleUpdateArticle = async (data: FormInput) => {
    const { title, description } = data;

    const image_url = imageFile
      ? await imageUpload(imageFile)
      : article.image_url;
    const publisher = selectedPublisher || article.publisher;
    const tags =
      selectedTags.length > 0
        ? selectedTags.map((tag) => tag.value)
        : article.tags;

    const hasChanges =
      title !== article.title ||
      description !== article.description ||
      imageFile ||
      publisher !== article.publisher ||
      JSON.stringify(tags) !== JSON.stringify(article.tags);

    if (!hasChanges) {
      swalAlert('warning', 'Please update article info');
      return;
    }

    const formData = {
      title,
      description,
      image_url,
      tags,
      publisher,
    };

    try {
      const res = await axiosSecure.patch(`/update/${id}`, formData);
      if (res.data.modifiedCount) {
        toast.success('Update Successful');
        navigate('/my-articles');
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err);
    }
  };

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
          className='space-y-2'
        >
          {/* Title */}
          <div className='form-control'>
            <input
              defaultValue={article.title}
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
              className='pt-2 pl-[14px] min-w-40 text-gray-600'
            >
              Select Image:
            </label>
            <input
              type='file'
              id='image'
              accept='image/*'
              {...register('image')}
              onChange={handleImageChange}
            />
          </div>

          {/* Publisher & Tags */}
          <div className='flex gap-4 pt-[1px]'>
            <div className='form-control w-2/3'>
              <Select
                defaultValue={article.tags.map((tag: { value: string; label: string}) => ({
                  value: tag,
                  label: tag,
                }))}
                options={tagsOptions}
                isMulti
                onChange={(selected) =>
                  setSelectedTags(selected as TagOption[])
                }
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
              {errors.publisher && (
                <p className='text-red-500 mt-2'>{errors.publisher.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className='form-control'>
            <textarea
              rows={20}
              {...register('description', {
                required: 'Description is required',
              })}
              placeholder='Description'
              defaultValue={article.description}
              className='textarea textarea-bordered'
            />
            {errors.description && (
              <p className='text-red-500 mt-2'>{errors.description.message}</p>
            )}
          </div>

          {/* Submit */}
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
