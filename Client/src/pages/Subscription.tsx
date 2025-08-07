import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import useLoadUser from '../hooks/useLoadUser';
import { addSeconds, differenceInSeconds, format } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Subscription = () => {
  const [userData, isLoading, isError, error] = useLoadUser();

  if (isLoading) return <LoadingSpinner />
  if(isError) return <ErrorMessage error={error}/>
  
// calculate current time and premium token time
  const currentTimeInMilliseconds = Math.floor(new Date().getTime());

   const secondsRemaining = differenceInSeconds(
     userData.premiumToken * 1000,
     currentTimeInMilliseconds
   );

   const expirationDate = addSeconds(new Date(), secondsRemaining);

   // Format the expiration date
   const formattedExpirationDate = format(
     expirationDate,
     '::::: d-MM-yyyy ::::: HH:mm:ss'
   );
  console.log(currentTimeInMilliseconds)
  
  
  return (
    <div className='max-w-7xl mx-auto my-4 xl:my-8'>
      <Helmet>
        <title>Tech Insights || Subscription</title>
      </Helmet>

      <PageTitle title='User Subscription' />

      <div className='border-2 border-green-lantern py-2 -mt-4 mb-12 w-3/4 lg:w-1/2 mx-auto text-center space-y-2 rounded-xl border-dotted'>
        {userData.subscription === 'premium' && (
          <p className='text-lg font-semibold '>
            You already are a premium subscriber.
          </p>
        )}

        {userData.premiumToken && (
          <p>
            Your subscription will end at{' '}
            <span className='font-wendy ml-1 tracking-wider'>
              {formattedExpirationDate}
            </span>
          </p>
        )}

        {userData.subscription !== 'premium' && (
          <p className='text-lg font-semibold '>
            Buy Premium Subscription to enjoy all features
          </p>
        )}
      </div>

      <>
        <div className='grid  lg:grid-cols-3 px-8 gap-10 text-zinc-800 w-3/4 mx-auto lg:w-full'>
          {/* first card */}
          <div className='flex flex-col items-center bg-gradient-to-br from-green-300 to-green-600 p-8 rounded-2xl shadow-2xl max-w-sm'>
            <div>
              <h2 className='font-extrabold text-3xl text-center mb-2'>
                Starter
              </h2>
              <p className='opacity-60 text-center'>
                For the individual and small teams
              </p>
              <div className='flex flex-col items-center my-8'>
                <p className='font-extrabold text-4xl'>$7</p>
                <p className='text-sm opacity-60'>/day</p>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>Trending Dashboard</b>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 ml-1 fill-orange-300'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>10 Keywords</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>7 Days Premium Access</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>3 Users</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>Basic Support</b>
              </p>

              <div className='flex justify-center mt-8 '>
                <Link
                  to='/payment'
                  state={{
                    price: 49,
                    validationTime: 7 * 86400,
                    type: 'weekly',
                  }}
                >
                  <button className='px-4 py-2 font-semibold  glass hover:rounded-full outline outline-green-lantern hover:outline-deep-ocean rounded-lg'>
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* second card */}
          <div
            className='flex flex-col items-center bg-gradient-to-br  from-green-600
           to-blue-300 p-8 rounded-2xl shadow-2xlg relative border-8 border-midnight-gray max-w-sm'
          >
            <p className='mono text-sm absolute -top-5 bg-green-lantern text-zinc-100 py-2 px-8 font-bold tracking-wider rounded'>
              POPULAR
            </p>
            <div>
              <div className='flex gap-4 justify-center'>
                <p className='font-extrabold text-3xl mb-2'>Semi Pro</p>
              </div>
              <p className='opacity-60 text-center'>
                For small agencies and businesses
              </p>
              <p className='opacity-60 text-center'></p>
              <div className='flex gap-4 justify-center'>
                <div className='flex flex-col items-center my-8'>
                  <p className='font-extrabold text-4xl'>$5</p>
                  <p className='text-sm opacity-60'>/day</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>Trending Dashboard</b>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 ml-1 fill-orange-300'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>25 Keywords</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>30 Days Premium Access</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>10 Users</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>{' '}
                <b> Premium Support</b>
              </p>
              {/* btn */}
              <div className='flex justify-center mt-8'>
                <Link
                  to='/payment'
                  state={{
                    price: 150,
                    validationTime: 30 * 86400,
                    type: 'monthly',
                  }}
                >
                  <button className='px-4 py-2 font-semibold  glass hover:rounded-full outline outline-green-lantern hover:outline-deep-ocean rounded-lg'>
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* third card */}
          <div className='flex flex-col items-center bg-gradient-to-br from-blue-300 to-blue-600 p-8 rounded-2xl shadow-2xl max-w-sm'>
            <div>
              <h2 className='font-extrabold text-3xl text-center mb-2'>
                Professional
              </h2>
              <p className='opacity-60 text-center'>
                For entrepreneur and large agency
              </p>
              <div className='flex flex-col items-center my-8'>
                <p className='font-extrabold text-4xl'>$3</p>
                <p className='text-sm opacity-60'>/day</p>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>Trending Dashboard</b>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 ml-1 fill-orange-300'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>10 Keywords</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>90 Days Premium Access</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <b>3 Users</b>
              </p>
              <p className='flex items-center text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                    clipRule='evenodd'
                  ></path>
                </svg>{' '}
                Basic Support
              </p>
              <div className='flex justify-center mt-8 '>
                <Link
                  to='/payment'
                  state={{
                    price: 270,
                    validationTime: 90 * 86400,
                    type: 'trimonthly',
                  }}
                >
                  <button className='px-4 py-2 font-semibold  glass hover:rounded-full outline outline-green-lantern hover:outline-deep-ocean rounded-lg'>
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default Subscription;
