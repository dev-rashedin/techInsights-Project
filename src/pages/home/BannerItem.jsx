import { Suspense, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import '../home/Banner.css';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { axiosApi } from '../../api/axiosApi';
import BannerCard from '../../components/BannerCard';
import { Link } from 'react-router-dom';


const BannerItem = () => {

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  // load articles data
  const { data: articles = [], isLoading, isError, error } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await axiosApi.get('/recent-articles-banner');
      return res.data.data;
    },
    onError: (error) => {
      console.error('Error fetching articles:', error);
    },
  });

  console.log('articles inside banner item',articles)
  
  
  
// manage loading and error
  if (isLoading) return <LoadingSpinner />
  if(isError) return <ErrorMessage error={error}/>


  return (
    <main className='lg:w-1/2 md:ml-2 lg:ml-0 '>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        speed={2000}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        {articles.map((article) => (
          <SwiperSlide key={article._id}>
            <Link to={`/details/${article._id}`}>
              <BannerCard article={article} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};
export default BannerItem;
