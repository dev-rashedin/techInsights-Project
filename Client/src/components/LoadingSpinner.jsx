

const LoadingSpinner = () => {
  return (
    <div className='flex items-center justify-center min-h-screen text-deep-ocean'>
      Data Loading{' '}
      <span className='loading loading-dots loading-md ml-4'></span>
    </div>
  );
}
export default LoadingSpinner