import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { axiosApi } from '../../api/axiosApi';

export default function ScrollingNews() {
  const {
    data: articles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['recent-articles'],
    queryFn: async () => {
      const res = await axiosApi.get('/recent-articles');
      return res.data.data;
    },
    onError: (error) => {
      console.error('Error fetching articles:', error);
    },
  });

  // console.log(articles)
  

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div
      data-aos='fade-up'
      data-aos-duration='300'
      className='scroll-container'
    >
      <div className='scroll-content'>
        <Swiper
          direction='vertical'
          slidesPerView='auto'
          loop={true} // enable looping
          freeMode={true} // allows smooth free scroll
          freeModeMomentum={false}
          className='mySwiper'
        >
          {articles.map((article) => (
            <SwiperSlide key={article._id} className='mb-8'>
              <h4 className=' font-semibold mt-4  '>{article.title}</h4>
              <p className='text-sm mt-2 tracking-wider text-justify  '>
                {article?.description}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
