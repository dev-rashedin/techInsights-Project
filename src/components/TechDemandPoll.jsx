import React, { useState } from 'react';

const TechDemandPoll = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voteCounts, setVoteCounts] = useState({
    webDev: 50,
    appDev: 30,
    machineLearning: 35,
    gameDev: 40,
  });
  const [totalVotes, setTotalVotes] = useState(140);
  const [hasVoted, setHasVoted] = useState(false);

  // handle vote btn
   const handleVote = async (option) => {
      const { data } = await axiosApi.post('/demanding-sector', {
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

  const getPercentage = (count) => ((count / totalVotes) * 100).toFixed(1);

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8'>
      <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100 text-center'>
        Which will be more demanding in the future?
      </h2>
      <div className='mt-6'>
        <PollOption
          option='Web Development'
          count={voteCounts.webDev}
          percentage={getPercentage(voteCounts.webDev)}
          selectedOption={selectedOption}
          onVote={() => handleVote('webDev')}
        />
        <PollOption
          option='App Development'
          count={voteCounts.appDev}
          percentage={getPercentage(voteCounts.appDev)}
          selectedOption={selectedOption}
          onVote={() => handleVote('appDev')}
        />
        <PollOption
          option='Machine Learning'
          count={voteCounts.machineLearning}
          percentage={getPercentage(voteCounts.machineLearning)}
          selectedOption={selectedOption}
          onVote={() => handleVote('machineLearning')}
        />
        <PollOption
          option='Game Development'
          count={voteCounts.gameDev}
          percentage={getPercentage(voteCounts.gameDev)}
          selectedOption={selectedOption}
          onVote={() => handleVote('gameDev')}
        />
      </div>
      <p className='mt-4 text-gray-600 dark:text-gray-300 text-center'>
        Total Votes: {totalVotes}
      </p>
      {hasVoted && (
        <p className='mt-2 text-green-600 text-center'>Thank you for voting!</p>
      )}
    </div>
  );
};

const PollOption = ({ option, count, percentage, selectedOption, onVote }) => (
  <button
    onClick={onVote}
    className={`w-full p-3 my-2 text-left border rounded-lg transition-colors duration-300
      ${
        selectedOption === option.toLowerCase()
          ? 'bg-blue-950 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
      } hover:bg-gray-800 hover:text-white`}
    disabled={selectedOption !== null}
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

export default TechDemandPoll;
