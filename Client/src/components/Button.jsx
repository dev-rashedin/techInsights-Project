import PropTypes from 'prop-types';

const Button = ({ label, type, onClick }) => {
  let buttonClass =
    'px-4 py-2 rounded-lg hover:rounded-full text-pure-white text-sm lg:text-base font-wendy';

  if (type === 'primary') {
    buttonClass += ' bg-green-lantern hover:bg-deep-ocean';
  } else if (type === 'secondary') {
    buttonClass +=
      '  bg-deep-ocean hover:bg-green-lantern';
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
