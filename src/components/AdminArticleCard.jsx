import { toast } from 'react-toastify';
import useAxiosSecure from '../hooks/useAxiosSecure';
import placeholderImage from '../assets/placeholder.png';
import Swal from 'sweetalert2';
import { useState } from 'react';
import DeclineModal from './modals/DeclineModal';


const AdminArticleCard = ({ article, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const axiosSecure = useAxiosSecure();

  // destructuring post
  const {
    _id,
    title,
    image_url,
    publisher,
    isPremium,
    status,
    posted_by,
    posted_time,
    writers_email,
  } = article;

  // console.log(article)
  

  // close modal

  const handleDeclineModal = () => {
    setIsOpen(!isOpen);
  };

  // handle admin action

  const handleApproveBtn = async (id) => {
    const updatedInfo = { status: 'approved' };
    try {
      const { data } = await axiosSecure.put(`/articles/${id}`, updatedInfo);

      if (data.modifiedCount) {
        toast.success('Post Approved');
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleDeclineBtn = async (id) => {
    console.log('decline button clicked');
    
    const updatedInfo = { status: 'declined' };
    try {
      const { data } = await axiosSecure.put(`/articles/${id}`, updatedInfo);

      console.log(data)
      

      if (data.modifiedCount) {
        toast.info('Post Declined');
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleDeleteBtn = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/articles/${id}`);

          if (data.deletedCount) {
            toast.warn('Post deleted');
            refetch();
          }
        }
      });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleMakePremiumBtn = async (id) => {
    const updatedInfo = { isPremium: 'yes' };
    try {
      const { data } = await axiosSecure.put(`/articles/${id}`, updatedInfo);

      if (data.modifiedCount) {
        toast.success('This post is now premium!');
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className='max-w-2xl px-8 py-4 rounded-lg shadow-xl border-2 border-deep-ocean border-dotted hover:transition-all hover:border-green-lantern hover:duration-300 rounded-ee-[15%] rounded-es-[15%] group md:mx-20 lg:mx-0'>
      <div className='mt-8 md:h-[280px]'>
        {/* image */}
        <img
          className='rounded-xl mx-auto -translate-y-28 h-48 mb-4 lg:mt-2 group-hover:scale-105 transition duration-800 ease-in w-11/12'
          src={image_url ? image_url : placeholderImage}
          alt=''
        />

        {/* title, tags, description */}
        <p className='text-lg font-bold -mt-24'>
          {' '}
          <span className='italic font-semibold mr-1'>Title:</span>{' '}
          {title.length < 45
            ? `${title.slice(0, 45)}`
            : `${title.slice(0, 45)}...`}
        </p>

        {/* time and category */}
        <div className='flex items-center justify-between mt-4'>
          <p className='font-wendy text-sm'>
            <span className='font-raleway italic font-semibold mr-1'>
              Posted At:{' '}
            </span>
            {posted_time}
          </p>
          {/* publisher */}
          <p
            className={`px-3 py-1 text-xs font-bold text-center ${
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
            } rounded-full px-2 flex gap-2 lg:gap-0 lg:px-4`}
          >
            <span> Publisher:</span> <span>{publisher}</span>
          </p>
        </div>

        <div className='mt-4 flex justify-between'>
          <p className='mb-1'>
            Author:
            <span className='font-semibold ml-1'>{posted_by}</span>
          </p>
          <p className='mb-1'>
            Status:
            <span className='font-semibold ml-1'>{status}</span>
          </p>
        </div>
        <p>
          Email:
          <span className='font-semibold ml-1'>{writers_email}</span>
        </p>
      </div>

      {/* button */}
      <div className='mt-8 lg:mt-0 flex flex-col gap-4 md:gap-0 justify-between md:justify-center items-center md:items-stretch'>
        {/* approve and decline btn */}
        <div className='flex flex-col md:flex-row justify-between space-y-2 md:space-y-0'>
          <button
            onClick={() => handleApproveBtn(_id)}
            disabled={status === 'approved'}
            className='font-semibold cursor-pointer border-2 border-deep-ocean px-2 py-1 w-60 md:w-40 rounded-lg hover:border-opacity-100 hover:rounded-full glass outline outline-green-lantern mb-2 disabled:cursor-not-allowed disabled:bg-gray-500'
          >
            {status === 'approved' ? 'Already Approved' : 'Approve Post'}
          </button>
          <button
            onClick={handleDeclineModal}
            disabled={status === 'declined'}
            className='font-semibold cursor-pointer border-deep-ocean px-2 py-1 w-60 md:w-40 rounded-lg hover:border-opacity-100 hover:rounded-full glass outline outline-green-lantern disabled:cursor-not-allowed disabled:bg-gray-500 h-8'
          >
            {status === 'declined' ? 'Cannot Decline' : 'Decline Post'}
          </button>
          <DeclineModal
            isOpen={isOpen}
            closeModal={handleDeclineModal}
            handleDeclineBtn={handleDeclineBtn}
            id={_id}
          />
        </div>
        {/* delete and make premium btn */}
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:justify-between my-2'>
          <button
            onClick={() => handleDeleteBtn(_id)}
            className='
          font-semibold  cursor-pointer border-2 border-deep-ocean px-2 py-1 w-60 md:w-40 rounded-lg hover:border-opacity-100 hover:rounded-full glass outline outline-green-lantern mb-2'
          >
            Delete Post
          </button>
          <button
            onClick={() => handleMakePremiumBtn(_id)}
            disabled={isPremium === 'yes'}
            className='font-semibold  cursor-pointer border-2 border-deep-ocean px-2 py-1 h-8 md:mt-0 w-60 rounded-lg hover:border-opacity-100 hover:rounded-full glass outline outline-green-lantern md:w-40 disabled:cursor-not-allowed disabled:bg-gray-500'
          >
            {isPremium === 'yes' ? 'Already Premium' : ' Make Premium'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminArticleCard;
