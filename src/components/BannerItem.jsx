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
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BannerCard from './BannerCard';

const BannerItem = async({articles}) => {
  // const { articles } = await props;

  console.log('articles inside banner item', articles);
  

    useEffect(() => {
      AOS.init({
        once: true,
      });
    }, []);

  return (
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
  );
};
export default BannerItem;
