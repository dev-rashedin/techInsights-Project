import Swal from 'sweetalert2';

const swalAlert = (icon, title, position = 'center') => {
  Swal.fire({
    position: position,
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 2000,
  });
};

export default swalAlert;
