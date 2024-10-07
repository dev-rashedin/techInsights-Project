import PageTitle from '../../components/PageTitle';
import LanguageQuiz from '../../components/LanguageQuiz';
import DemandingSector from '../../components/DemandingSector';

const Poll = () => {
  return (
    <div className='mt-8'>
      <PageTitle title='Participate in Tech Quiz' />
      <div className='flex flex-col md:flex-row gap-6 -mt-4'>
        <LanguageQuiz/>
        <DemandingSector/>
      </div>
    </div>
  );
};
export default Poll;
