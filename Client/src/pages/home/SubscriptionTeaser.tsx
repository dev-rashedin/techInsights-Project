import { Link } from 'react-router-dom';
import goodThings from '../../assets/await.webp';
import ready2 from '../../assets/ready2.png';

const SubscriptionTeaser = () => {
  return (
    <div className='   pt-20 pb-12'>
      <div className='max-w-6xl mx-auto px-4 text-center lg:flex lg:items-center gap-8'>
        <div className='lg:w-3/5'>
          <img src={ready2} className='w-96 h-28 mx-auto' alt='' />
          <h2 className='text-3xl font-extrabold mb-4'>
            Ready to Unlock Exclusive Benefits?
          </h2>
          <p className='text-lg mb-8'>
            Subscribe today and get access to premium content, priority support,
            and more. Don’t miss out on the best features!
          </p>
          <div className='hidden lg:block'>
            <Link to='/subscription'>
              <button className='px-6 py-3 bg-purple-600 text-white font-semibold text-lg rounded-lg hover:bg-purple-700 transition duration-300'>
                Explore Subscription Plans
              </button>
            </Link>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div>
            <img
              src={goodThings}
              alt='Unlock Premium'
              className='rounded-lg shadow-lg object-cover h-[360px] w-96 opacity-80'
            />
          </div>
          <div className='block lg:hidden -translate-y-4'>
            <Link to='/subscription'>
              <button className='px-6 py-3 bg-purple-600 text-white font-semibold text-lg rounded-lg hover:bg-purple-700 transition duration-300'>
                Explore Subscription Plans
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTeaser;
