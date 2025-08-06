import { useQuery } from '@tanstack/react-query';
import PageTitle from '../../components/PageTitle';
import LoadingSpinner from '../../components/LoadingSpinner';
import { axiosApi } from '../../api/axiosApi';
import Marquee from 'react-fast-marquee';
import ErrorMessage from './../../components/ErrorMessage';

const PublisherSection = () => {
  const {
    data: publisherData = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['publishers'],

    queryFn: async () => {
      const { data } = await axiosApi.get('/publishers');

      return data;
    },
  });

  // console.log(publisherData)
  

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div>
      <PageTitle title='All Publishers' />

      <div className='my-6 mx-6 lg:mx-8'>
        <Marquee direction='right' speed={30}>
          {publisherData?.map((publisher) => (
            <div
              key={publisher.title}
              className='flex flex-col items-center justify-center mr-8'
            >
              <div
                className='w-40 h-40 rounded-b-full bg-gray-300 bg-center bg-cover 
               shadow-md -translate-y-0'
                style={{
                  backgroundImage: `url(${publisher.logo})`,
                }}
              ></div>

              <div className='w-56 -mt-10 overflow-hidden bg-white rounded-xl shadow-lg md:w-64 dark:bg-gray-900'>
                <h3 className='font-bold text-gray-800 dark:text-gray-200   py-3 text-center '>
                  Publisher :
                </h3>

                <div className='flex items-center justify-center px-3 py-4  dark:bg-gray-700'>
                  <span className='font-bold tracking-wide text-center uppercase dark:text-white'>
                    {publisher.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
export default PublisherSection;
