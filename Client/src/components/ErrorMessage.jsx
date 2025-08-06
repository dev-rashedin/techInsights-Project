import PropTypes from 'prop-types'

const ErrorMessage = ({error}) => {
  return (
    <p className='flex items-center justify-center min-h-screen text-red-400'>
      {error.message}
    </p>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
}
export default ErrorMessage