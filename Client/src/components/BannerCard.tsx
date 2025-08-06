import placeholderImage from '../assets/placeholder.png';
import { IArticle } from './../../interface';

const BannerCard = ({ article } : { article: IArticle }) => {
  // destructuring article
  const { title, description, image_url, tags, publisher, posted_time } =
    article;

  return (
    <div
      className={`max-w-3xl px-8 py-4 rounded-lg shadow-xl border-2 border-deep-ocean border-dotted hover:transition-all hover:border-green-lantern hover:duration-300 rounded-ss-3xl rounded-ee-3xl group h-[75vh] overflow-hidden`}
    >
      {/* time and publisher*/}
      <div className=' flex items-center justify-between'>
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
          } rounded-full px-2`}
        >
          {publisher}
        </p>
      </div>

      <div className='mt-4 h-[45%]'>
        {/* image */}
        <img
          className='rounded-xl mx-auto h-full w-full lg:w-[90%]'
          src={image_url ? image_url : placeholderImage}
          alt=''
        />
        {/* title */}
        <p className='text-lg lg:text-xl font-bold lg:mt-6 xl:mt-8'>{title}</p>
        {/* tags */}
        <p className='text-sm flex italic mt-2 pb-1 justify-between  '>
          <span className='flex gap-4'>
            {tags.map((tag) => (
              <span className='font-semibold' key={tag}>
                # {tag}
              </span>
            ))}
          </span>
          {article.isPremium === 'yes' && (
            <span className='not-italic font-wendy text-[16px] text-amber-600'>
              Premium
            </span>
          )}
        </p>

        <p className='mt-2 text-sm text-justify max-h-[170px] pb-4 overflow-hidden'>
          {description.slice(0, 650)}....{' '}
          <span className='ml-4 xl:ml-8 italic font-bold text-xs tracking-wider'>
            click to read more
          </span>
        </p>
      </div>
    </div>
  );
};
export default BannerCard;
