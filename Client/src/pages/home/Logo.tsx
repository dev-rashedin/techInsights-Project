import { Typewriter } from 'react-simple-typewriter';
import MottoMarquee from './MottoMarquee';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
      <div className='flex items-center justify-between ml-5 xl:ml-7 mt-8'>
        <Link
          to='/'
          className='text-3xl md:text-4xl lg:text-5xl font-bold cursor-pointer font-sevillana text-green-lantern drop-shadow'
        >
          <Typewriter
            words={['Tech Insights']}
          typeSpeed={100}
          deleteSpeed={80}
          loop={true}
            cursor={true}
          cursorBlinking
          
          />
        </Link>

        <div className='w-1/2 md:w-[65%] xl:w-[78%] mr-5 md:mr-8'>
          <MottoMarquee />
        </div>
      </div>
  );
};
export default Logo;
