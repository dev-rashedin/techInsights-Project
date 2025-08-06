import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { axiosApi } from '../api/axiosApi';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { User } from 'firebase/auth';
import { DemandingPollOptionProps, VoteData } from '../../interface';



const PollOption = ({
  option,
  userVote,
  percentage,
  info,
  onVote,
}: DemandingPollOptionProps) => (
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

const DemandingSector = () => {
  const [userVote, setUserVote] = useState<string | null>(null);
  const { user }: { user: User | null } = useAuth();

  // Fetch user vote
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosApi.get(`/demanding-sector/${user?.email}`);
      setUserVote(data.votedOption);
    };

    if (user) {
      fetchData();
    }
  }, [user?.email]);

  // Fetch sector votes
  const {
    data: voteData = { totalVotes: 0, demandingSectors: [] },
  }: { data?: VoteData } = useQuery({
    queryKey: ['demanding-sector'],
    queryFn: async () => {
      const { data } = await axiosApi.get('/demanding-sector');
      return data as VoteData;
    },
  });

  const { totalVotes, demandingSectors } = voteData;

  const getVotes = (sector: string) =>
    demandingSectors.find((s) => s.sector === sector)?.votes || 0;

  const getPercentage = (count: number) =>
    ((count / totalVotes) * 100).toFixed(1);

  const handleVote = async (option: string) => {
    const { data } = await axiosApi.post('/demanding-sector', {
      voterEmail: user?.email,
      votedOption: option,
    });

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
          percentage={getPercentage(getVotes('webDev'))}
          onVote={() => handleVote('webDev')}
        />
        <PollOption
          option='App Development'
          info='appDev'
          userVote={userVote}
          percentage={getPercentage(getVotes('appDev'))}
          onVote={() => handleVote('appDev')}
        />
        <PollOption
          option='Machine Learning'
          info='machineLearning'
          userVote={userVote}
          percentage={getPercentage(getVotes('machineLearning'))}
          onVote={() => handleVote('machineLearning')}
        />
        <PollOption
          option='Game Development'
          info='gameDev'
          userVote={userVote}
          percentage={getPercentage(getVotes('gameDev'))}
          onVote={() => handleVote('gameDev')}
        />
      </div>
      <div className='text-faded-pearl ml-1 text-center mt-4'>
        {userVote ? (
          <p>
            <span className='text-white text-center text-sm'>
              You've Voted For:
            </span>{' '}
            <span className='font-wendy ml-1 text-base'>
              {userVote.slice(0, 1).toUpperCase() + userVote.slice(1)}
            </span>
          </p>
        ) : (
          'Please Vote'
        )}
      </div>
      <p className='mt-4 text-gray-600 dark:text-gray-300 text-center'>
        Total Votes:{' '}
        <span className='text-lg ml-1 bg-yellow-900 p-1 rounded-full drop-shadow-xl text-white'>
          {totalVotes}
        </span>
      </p>
    </div>
  );
};

export default DemandingSector;
