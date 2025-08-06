import PropTypes from 'prop-types'
import paperLogo from '../assets/paper.png'



const PageTitle = ({title}) => {
  return (
    <div className='flex items-center justify-center'>
      <img className='w-16 h-16' src={paperLogo} alt='' />
      <h2 className='text-4xl tracking-wide mb-10 font-wendy mt-8 '>
        {title}
      </h2>
      <img className='w-16 h-16' src={paperLogo} alt='' />
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageTitle;
