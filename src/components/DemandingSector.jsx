import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { axiosApi } from '../api/axiosApi';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const DemandingSector = () => {
  const [userVote, setUserVote] = useState(null);
  const { user } = useAuth();

  // get user vote data
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosApi.get(`/demanding-sector/${user?.email}`);
      console.log(data);

      setUserVote(data.votedOption);
    };

    if (user) {
      fetchData();
    }
  }, [user?.email]);

  // console.log(userVote)
  

  // getting data from db
  const {
    data: voteData = {},
    refetch,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['demanding-sector'],
    queryFn: async () => {
      const { data } = await axiosApi.get('/demanding-sector');
      return data;
    },
    onError: (error) => {
      console.error('Error fetching user:', error);
    },
  });

  // console.log(voteData);

  const { totalVotes, demandingSectors } = voteData;

  // console.log(totalVotes, demandingSectors);

  // get each language votes
  const machineLearningVotes = demandingSectors?.find(
    (s) => s.sector === 'machineLearning'
  )?.votes;

  const gameDevVotes = demandingSectors?.find(
    (s) => s.sector === 'gameDev'
  )?.votes;

  const webDevVotes = demandingSectors?.find(
    (s) => s.sector === 'webDev'
  )?.votes;

  const appDevVotes = demandingSectors?.find(
    (s) => s.sector === 'appDev'
  )?.votes;

  // console.log(machineLearningVotes, appDevVotes, webDevVotes, gameDevVotes)

  // get percentage
  const getPercentage = (count) => ((count / totalVotes) * 100).toFixed(1);

  const handleVote = async (option) => {
    const { data } = await axiosApi.post('/demanding-sector', {
      voterEmail: user?.email,
      votedOption: option,
    });

    // console.log(data);
    if (data.insertedId) {
      toast.success('Thanks for voting');
    } else {
      toast.error(data);
    }
  };

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8'>
      <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100 text-center'>
        Which will be more demanding in the future?
      </h2>
      <div className='mt-6'>
        <PollOption
          option='Web Development'
          info='webDev'
          userVote={userVote}
          percentage={getPercentage(webDevVotes)}
          onVote={() => handleVote('webDev')}
        />
        <PollOption
          option='App Development'
          info='appDev'
          userVote={userVote}
          percentage={getPercentage(appDevVotes)}
          onVote={() => handleVote('appDev')}
        />
        <PollOption
          option='Machine Learning'
          info='machineLearning'
          userVote={userVote}
          percentage={getPercentage(machineLearningVotes)}
          onVote={() => handleVote('machineLearning')}
        />
        <PollOption
          option='Game Development'
          info='gameDev'
          userVote={userVote}
          percentage={getPercentage(gameDevVotes)}
          onVote={() => handleVote('gameDev')}
        />
      </div>
      <p className='text-white text-center text-sm mt-4'>
        You've Voted For:{' '}
        <span className='font-wendy text-base text-faded-pearl ml-1'>
          {userVote
            ? userVote.slice(0, 1).toUpperCase() + userVote.slice(1)
            : 'Please Vote'}
        </span>
      </p>
      <p className='mt-4 text-gray-600 dark:text-gray-300 text-center'>
        Total Votes:{' '}
        <span className='text-lg ml-1 bg-yellow-900 p-1 rounded-full drop-shadow-xl text-white'>
          {totalVotes}
        </span>
      </p>
    </div>
  );
};

const PollOption = ({
  option,
  userVote,
  percentage,
  info,
  onVote,
}) => (
  <button
    onClick={onVote}
    className={`w-full p-3 my-2 text-left border rounded-lg transition-colors duration-300
      ${
        userVote && userVote === info
          ? 'bg-blue-900 text-white border-2 hover:bg-blue-950'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
      } hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed`}
    disabled={userVote !== null}
  >
    <div className='flex justify-between items-center'>
      <span>{option}</span>
      <span>{percentage}%</span>
    </div>
    <div className='relative h-2 mt-2 bg-gray-300 dark:bg-gray-600 rounded'>
      <div
        className='absolute top-0 left-0 h-full bg-blue-500 rounded'
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </button>
);

export default DemandingSector;
