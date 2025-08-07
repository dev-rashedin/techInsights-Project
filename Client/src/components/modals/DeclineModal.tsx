import PropTypes from 'prop-types';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment } from 'react';
import { MdClose } from 'react-icons/md';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { StatusCodes } from 'http-status-toolkit';
import { DeclinedModalProps } from '../../../interface';


type FormData = {
  message: string
}

const DeclineModal = ({ isOpen, closeModal, handleDeclineBtn, id } : DeclinedModalProps) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleSubmitMessage = async (data: { message: string }) => {
    try {
      const declinedMessage = {
        articleId: id,
        message: data.message,
      };

      console.log(declinedMessage)

      const res = await axiosSecure.post(`/message/${id}`, declinedMessage);
console.log(res)

      if (res.status === StatusCodes.CREATED) {
        toast.success('Your message is sent');
        handleDeclineBtn(id);
        closeModal;
      }
    } catch (error : any) {
      toast.error(error.message);
      console.error(error);
    }
  };

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
              Send your valid reason here....
            </DialogTitle>

            {/* update form */}
            <form
              onSubmit={handleSubmit(handleSubmitMessage)}
              className=' space-y-2'
            >
              {/* name */}
              <div className='form-control'>
                <textarea
                  rows={4}
                  {...register('message', { required: true })}
                  placeholder='Typing....'
                  className='p-4 rounded-lg bg-faded-pearl bg-opacity-75 placeholder:    font-semibold'
                  // className='input input-bordered'
                />
                {errors.message && (
                  <p className='text-red-500 mt-2'>
                    You need show a cuse to decline
                  </p>
                )}
              </div>

              <div className='form-control mt-6'>
                <button
                  type='submit'
                  className='btn bg-green-lantern text-pure-white hover:bg-deep-ocean mt-2'
                >
                  Decline
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
export default DeclineModal;
