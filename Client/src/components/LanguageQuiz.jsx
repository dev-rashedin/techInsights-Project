import { useQuery } from '@tanstack/react-query';
import { axiosApi } from '../api/axiosApi';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const LanguageQuiz = () => {
  const [userVote, setUserVote] = useState(null);
  const { user } = useAuth();

  // fetching user vote
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosApi.get(`/lang-quiz/${user?.email}`);
      setUserVote(data.votedLang);     
    };

    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  // console.log(userVote);

  // getting data from db
  const {
    data: quizData = {},
    refetch,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['lang-quiz'],
    queryFn: async () => {
      const { data } = await axiosApi.get('/lang-quiz');
      return data;
    },
    onError: (error) => {
      console.error('Error fetching votes:', error);
    },
  });

  // console.log(quizData);

  const { totalVotes, languageVotes } = quizData;

  // console.log(totalVotes, languageVotes);

  // get each language votes
  const pythonVotes = languageVotes?.find(
    (l) => l.language === 'python'
  )?.votes;

  const javascriptVotes = languageVotes?.find(
    (l) => l.language === 'javascript'
  )?.votes;

  const rustVotes = languageVotes?.find((l) => l.language === 'rust')?.votes;

  const goVotes = languageVotes?.find((l) => l.language === 'go')?.votes;

  // console.log(pythonVotes, javascriptVotes, rustVotes, goVotes);

  // handle vote function
  const handleVote = async (option) => {
    const { data } = await axiosApi.post('lang-quiz', {
      voterEmail: user?.email,
      votedLang: option,
    });

    // console.log(data);
    if (data.insertedId) {
      toast.success('Thanks for voting');
    } else {
      toast.error(data);
    }
  };

  const getPercentage = (vote) => ((vote / totalVotes) * 100).toFixed(1);

  // manage loading and error
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8'>
      <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100 text-center'>
        Which Programming Language Will Dominate in 2024?
      </h2>

      {/* javascript */}
      <div className='mt-6'>
        <PollOption
          option='JavaScript'
          userVote={userVote}
          percentage={getPercentage(javascriptVotes)}
          onVote={() => handleVote('javascript')}
        />
        {/* python lang */}
        <PollOption
          option='Python'
          userVote={userVote}
          percentage={getPercentage(pythonVotes)}
          onVote={() => handleVote('python')}
        />
        {/* rust lang */}
        <PollOption
          option='Rust'
          userVote={userVote}
          percentage={getPercentage(rustVotes)}
          onVote={() => handleVote('rust')}
        />
        {/* go lang */}
        <PollOption
          option='Go'
          userVote={userVote}
          percentage={getPercentage(goVotes)}
          onVote={() => handleVote('go')}
        />
      </div>
      <div className='  text-faded-pearl ml-1 text-center mt-4'>
        {userVote ? (
          <p>
            <span className='text-white text-center text-sm '>
              {' '}
              You've Voted For:{' '}
            </span>{' '}
            <span className='font-wendy ml-1 text-base'>
              {' '}
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

const PollOption = ({ option, percentage, userVote, onVote }) => (
  <button
    onClick={onVote}
    className={`w-full p-3 my-2 text-left border rounded-lg transition-colors duration-300
   ${
     userVote && userVote === option.toLowerCase()
       ? 'bg-blue-900 text-white border-2 hover:bg-blue-950'
       : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
   } hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed`}
    disabled={userVote}
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

export default LanguageQuiz;
