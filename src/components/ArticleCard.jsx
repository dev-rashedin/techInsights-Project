import { Link } from 'react-router-dom';
import placeholderImage from '../assets/placeholder.png';
import { axiosApi } from '../api/axiosApi';
import useLoadUser from '../hooks/useLoadUser';

const ArticleCard = ({ article, refetch }) => {  

  // destructuring article
  const {
    _id,
    title,
    description,
    image_url,
    tags,
    publisher,
    isPremium,
    posted_by,
    posted_time
  } = article;

  const [userData] = useLoadUser();
  

// make view_count increase
      const incrementViewCount = async () => {
        try {
          await axiosApi.patch(
            `/articles/${_id}/increment-view`
          );
          refetch()
        } catch (error) {
          console.error('Error incrementing view count:', error);
        }
  };
  

  return (
    <div
      className={`max-w-xl px-8 py-4 rounded-lg shadow-xl border-2 border-deep-ocean border-dotted hover:transition-all hover:border-green-lantern hover:duration-300 rounded-ss-3xl rounded-ee-3xl group ${
        article.isPremium === 'yes'
          ? 'bg-gradient-to-br from-green-200 to-blue-400'
          : ''
      }`}
    >
      {/* time and publisher*/}
      <div className='flex items-center justify-between'>
        <p className='font-wendy text-sm'>{posted_time}</p>
        {/* publisher */}
        <p
          className={`px-3 py-1 text-sm font-bold ${
            publisher === 'Data Dive' &&
            'text-blue-600 bg-gradient-to-bl from-blue-100 via blue-50 to-blue-300'
          } ${
            publisher === 'DevOps Digest' &&
            'text-green-600 bg-gradient-to-bl from-green-100 via green-50 to-green-300'
          } ${
            publisher === 'AI Revolution' &&
            'text-purple-600 bg-gradient-to-bl from-purple-100 via purple-50 to-purple-300'
          } ${
            publisher === 'Cyber Shield' &&
            'text-rose-600 bg-gradient-to-bl from-rose-100 via rose-50 to-rose-300'
          } ${
            publisher === 'Tech Tomorrow' &&
            'text-orange-600 bg-gradient-to-bl from-orange-100 via orange-50 to-orange-300'
          } rounded-full px-2 font-m-plus`}
        >
          {publisher}
        </p>
      </div>

      <div className='mt-2'>
        {/* image */}
        <img
          className='rounded-xl mx-auto w-[300px] h-[150px] lg:h-40 mb-6 group-hover:scale-105 transition duration-800 object-cover ease-in'
          src={image_url ? image_url : placeholderImage}
          alt=''
        />
        {/* title */}
        <p className=' font-bold '>{title}</p>
        <p className='text-sm flex italic mt-2 pb-2 justify-between font-light'>
          <span className='flex gap-4'>
            {tags.map((tag) => (
              <span key={tag}># {tag}</span>
            ))}
          </span>
          {article.isPremium === 'yes' && (
            <span className='not-italic font-wendy text-[16px] text-amber-600'>
              Premium
            </span>
          )}
        </p>

        <p className='mt-1 text-sm'>{description.slice(0, 150)}....</p>
      </div>

      {/* read more */}
      <div className='flex items-center justify-end'>
        <Link to={`/details/${_id}`}>
          <button
            onClick={incrementViewCount}
            disabled={isPremium === 'yes' && userData.subscription === 'usual'}
            className='text-deep-ocean font-semibold hover:underline hover:transition hover:duration-300 hover:font-bold font-sevillana text-xl disabled:cursor-not-allowed disabled:text-gray-500'
          >
            Read more
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ArticleCard;
