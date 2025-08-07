
const ErrorMessage = ({error} : any) => {
  return (
    <p className='flex items-center justify-center min-h-screen text-red-400 '>
    {  console.error('the error from the error message page is',error)}
      {error.message}
    </p>
  );
}


export default ErrorMessage