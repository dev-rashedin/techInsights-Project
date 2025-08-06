// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './homeStat.css';

// import required modules
import {Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PageTitle from '../../components/PageTitle';


import slideImg1 from '../../assets/global.jpg'
import slideImg2 from '../../assets/ai.webp'
import slideImg3 from '../../assets/industry.jpeg'
import slideImg4 from '../../assets/stats.jpg'
import slideImg5 from '../../assets/popular.jpg'
import slideImg6 from '../../assets/journal.jpg'


const HomeStats = () => {
  return (
    <div className='pt-12 mx-8'>
      <PageTitle title='Recent Statistics' />
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        speed={2000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={true}
        modules={[Autoplay, EffectCoverflow]}
        className='myHomeSwiper'
      >
        <SwiperSlide>
          <img src={slideImg1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImg2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImg3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImg4} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImg5} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImg6} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default HomeStats;
