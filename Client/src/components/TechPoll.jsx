import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const TechPoll = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voteCounts, setVoteCounts] = useState({
    javascript: 30,
    python: 40,
    go: 20,
    rust: 15,
  });
  const [totalVotes, setTotalVotes] = useState(90);
  const [hasVoted, setHasVoted] = useState(false);

  const { user } = useAuth();

  // handle vote btn
  const handleVote = (option) => {
    if (hasVoted) return;

    setVoteCounts((prevVotes) => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1,
    }));

    setTotalVotes(totalVotes + 1);
    setSelectedOption(option);
    setHasVoted(true);
  };

  const getPercentage = (count) => ((count / totalVotes) * 100).toFixed(1);

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8'>
      <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100 text-center'>
        Which Programming Language Will Dominate in 2024?
      </h2>

      {/* javascript */}
      <div className='mt-6'>
        <PollOption
          option='JavaScript'
          count={voteCounts.javascript}
          percentage={getPercentage(voteCounts.javascript)}
          selectedOption={selectedOption}
          onVote={() => handleVote('javascript')}
        />
        <PollOption
          option='Python'
          count={voteCounts.python}
          percentage={getPercentage(voteCounts.python)}
          selectedOption={selectedOption}
          onVote={() => handleVote('python')}
        />
        <PollOption
          option='Rust'
          count={voteCounts.go}
          percentage={getPercentage(voteCounts.go)}
          selectedOption={selectedOption}
          onVote={() => handleVote('rust')}
        />
        <PollOption
          option='Go'
          count={voteCounts.go}
          percentage={getPercentage(voteCounts.go)}
          selectedOption={selectedOption}
          onVote={() => handleVote('go')}
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

export default TechPoll;
