import { Suspense } from "react";
import ScrollingNews from "./ScrollingNews";
import BannerItem from "./BannerItem";
import BannerSkeleton from "../../components/BannerSkeleton";
import LoadingSpinner from "../../components/LoadingSpinner";
import BannerSkeleton2 from '../../components/BannerSkeleton2';


const Banner = () => {
  return (
    <main className='flex flex-col-reverse lg:flex-row gap-8 px-4  mx-auto md:px-8 -pt-40'>
     
        {/* left side */}
        <div className='lg:w-1/2 mt-2 hidden lg:block'>
          <Suspense fallback={<BannerSkeleton />}>
            <ScrollingNews />
          </Suspense>
        </div>

        {/* right side */}
        <div className='lg:w-1/2 md:ml-2 lg:ml-0 '>
          <Suspense fallback={<BannerSkeleton2 />}>
            <BannerItem />
          </Suspense>
        </div>
    </main>
  );
}
export default Banner