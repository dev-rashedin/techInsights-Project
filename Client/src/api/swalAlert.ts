import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';




const swalAlert = (
  icon: SweetAlertIcon,
  title: string,
  position: SweetAlertPosition = 'center'
) => {
  Swal.fire({
    position,
    icon,
    title,
    showConfirmButton: false,
    timer: 2000,
  });
};

export default swalAlert;
