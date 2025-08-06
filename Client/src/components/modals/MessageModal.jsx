import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Description,
} from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { MdClose } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

const MessageModal = ({ isOpen, closeModal, id }) =>
{

  const axiosSecure = useAxiosSecure()

  // getting declined message for this post
  const {
    data: message = {},
    refetch,
  isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['message', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/message/${id}`);
      return res.data;
    },
    onError: (error) => {
      console.error('Error fetching declined message:', error);
    },
  });

  console.log(message)
  
// handle loading and error
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={closeModal} className='relative z-50'>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-1000'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-600'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <DialogPanel className='max-w-lg space-y-4 border bg-green-100 p-12 relative font-raleway rounded-md drop-shadow-md'>
            {/* close btn */}
            <button
              onClick={closeModal}
              className='absolute -top-3 -right-3 bg-green-lantern rounded-full p-2 cursor-pointer'
            >
              <MdClose color='white' size={20} />
            </button>
            <DialogTitle className='text-2xl pb-4 text-center font-wendy'>
              {message ? <span>{message.message}</span> : <span>No message available</span>}
            </DialogTitle>

            {/* update form */}
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
export default MessageModal;
