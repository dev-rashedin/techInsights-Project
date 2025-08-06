import Swal from 'sweetalert2';

type SwalIcon = 'success' | 'error' | 'warning' | 'info' | 'question';
type SwalPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'center-start'
  | 'center-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

const swalAlert = (
  icon: SwalIcon,
  title: string,
  position: SwalPosition = 'center'
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
