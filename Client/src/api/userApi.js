import Swal from 'sweetalert2';
import { axiosApi } from './axiosApi';
import swalAlert from './swalAlert';
import { toast } from 'react-toastify';



// create a user to the database
export const createOrUpdateUser = async (userInfo) => {
  try {
    const res = await axiosApi.put('/users', userInfo);

    if (res.data.upsertedId) {
      toast.success('User added to the database');
    }

    if (res.data.modifiedCount) {
      toast.success('User info updated successfully');
    }
    return res;
  } catch (error) {
    console.error(error);
    swalAlert('error', error.message);
    throw error;
  }
};

// post publisher info
export const postPublisherInfo = async (publisherData) => {
  try {
    //console.log(publisherData)

    const res = await axiosApi.post('/publishers', publisherData);

    //console.log(res)

    if (res.data.insertedId) {
      swalAlert('success', 'Publisher created successfully');
    }
  } catch (error) {
    console.error(error);
    swalAlert('error', error.message);
  }
};
