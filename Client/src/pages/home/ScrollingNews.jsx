import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import './styles.css';

import { useQuery } from '@tanstack/react-query';
import { axiosApi } from '../../api/axiosApi';

export default function ScrollingNews() {
  const { data: articles = [] } = useQuery({
    queryKey: ['recent-articles'],
    queryFn: async () => {
      const res = await axiosApi.get('/recent-articles');
      return res.data.data;
    },
    suspense: true,
    useErrorBoundary: true,
    onError: (error) => {
      console.error('Error fetching articles:', error);
    },
  });

  return (
    <div className='scroll-container'>
      <div className='scroll-content'>
        <Swiper
          direction='vertical'
          slidesPerView='auto'
          loop={true}
          spaceBetween={0}
          freeMode={true}
          mousewheel={true}
          modules={[Mousewheel]}
          className='mySwiper'
        >
          {[...articles, ...articles, ...articles].map((article, idx) => (
            <SwiperSlide key={idx} className='mb-8'>
              <h4 className='font-semibold mt-4'>{article.title}</h4>
              <p className='text-sm mt-2 tracking-wider text-justify'>
                {article?.description}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
