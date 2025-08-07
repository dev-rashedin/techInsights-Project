import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';
import placeholderImage from '../assets/placeholder.png';
import useAuth from '../hooks/useAuth';
import { BsEye } from 'react-icons/bs';
import { MdCategory, MdPermIdentity, MdPublish } from 'react-icons/md';
import Button from '../components/Button';
import { CgTimer } from 'react-icons/cg';
import { axiosApi } from '../api/axiosApi';

const Details = () => {
  const { id } = useParams();
  //console.log(id);

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: article = {},
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['article', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosApi.get(`/articles/${id}`);
      return data;
    },
  });

  // destructuring article
  const {
    title,
    description,
    image_url,
    tags,
    publisher,
    status,
    posted_by,
    posted_time,
    writers_email,
    view_count,
  } = article;

  // console.log(article);
  

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div>
      <Helmet>
        <title>Tech Insights || {title} </title>
      </Helmet>
      <PageTitle title='Article Details' />

      {/*  */}
      <div className=' space-y-8 lg:space-y-10 mx-6 lg:mx-40'>
        {/* post details */}
        <div className='max-w-2xl mx-auto '>
          {/* title */}

          <div className='ml-1'>
            <p>
              <span className='italic text-lg font-semibold '>Post Title:</span>
              <span className='text-lg lg:text-xl font-bold ml-2'>{title}</span>
            </p>
            <p>
              <span className='italic font-semibold '>Posted By:</span>
              <span className='text-lg font-semibold ml-2 '>{posted_by}</span>
            </p>
            <p>
              <span className='italic font-semibold text-sm'>Email:</span>
              <span className=' font-semibold ml-2 '>{writers_email}</span>
            </p>
          </div>
          {/* image */}
          <div className='mt-5'>
            <img
              className='rounded-xl mx-auto w-full h-[300px] lg:h-[400px] mb-4 mt-4'
              src={image_url ? image_url : placeholderImage}
              alt=''
            />
          </div>
          {/* tags, premium, view count */}
          <div className='mt-6'>
            <p className='text-sm md:flex italic mt-2 pb-2 justify-between mx-2'>
              <span className='flex gap-4 font-semibold'>
                {tags.map((tag : string) => (
                  <span key={tag}># {tag}</span>
                ))}
              </span>
              <span className='flex md:justify-center gap-6 md:gap-0 mt-2 md:mt-0'>
                {article.isPremium === 'yes' && (
                  <span className='not-italic font-wendy text-[16px] text-amber-600 md:mr-2 flex gap-2'>
                    <MdPermIdentity size={20} />
                    Premium
                  </span>
                )}

                <span className='ml-4 font-wendy flex gap-2 justify-center text-base -mt-[1px]'>
                  <BsEye className='mt-[2px]' size={18} color='blue' />
                  Total Views:{' '}
                  <span className='text-orange-600'>{view_count}</span>
                </span>
              </span>
            </p>
          </div>

          <div className='text-end mr-2 mt-2'>
            {status ? (
              <p className='italic text-xl font-sevillana'>
                Status:{' '}
                <span
                  className={`font-sevillana font-semibold ml-2 ${
                    status === 'pending'
                      ? 'text-orange-400'
                      : status === 'approved'
                      ? 'text-green-600'
                      : 'text-purple-800'
                  }`}
                >
                  {' '}
                  {status}
                </span>
              </p>
            ) : ''}
          </div>

          {/* time and category */}
          <div className='flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mt-6 mb-4'>
            <p className='border-2 border-green-lantern px-3 py-2 rounded-md flex'>
              <span className='italic mr-2 text-sm flex'>
                <CgTimer color='green' size={18} className='mr-1 mt-[1px]' />
                Published At:{' '}
              </span>
              <span className='font-wendy text-sm'>{posted_time}</span>
            </p>
            <p className='border-2 border-green-lantern px-3 py-2 rounded-md flex '>
              <span className='italic text-sm mr-2 flex mt-[2px]'>
                <MdCategory className='mr-2 mt-[2px] text-green-lantern' />
                Publisher:{' '}
              </span>
              <span className='font-wendy'>{publisher}</span>
            </p>
          </div>

          {/* description */}
          <div>
            <p className='mt-8 text-justify'>
              <span className='italic mr-2 font-semibold text-lg'>
                Description:{' '}
              </span>
              {description}
            </p>
          </div>
          <div className='flex justify-end mt-6'>
            {user?.email === article?.writers_email ? (
              <>
                <Link to={`/update/${id}`}>
                  <Button type='primary' label='Update Your Article' />
                </Link>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
