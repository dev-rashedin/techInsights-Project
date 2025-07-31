import { Suspense } from "react";
import ScrollingNews from "./ScrollingNews";
import BannerItem from "./BannerItem";
import BannerSkeleton from "../../components/BannerSkeleton";
import LoadingSpinner from "../../components/LoadingSpinner";


const Banner = () => {
  return (
    <main className='flex flex-col-reverse lg:flex-row gap-8 px-4  mx-auto md:px-8'>
      <Suspense fallback={<BannerSkeleton />}>
        {/* left side */}
        <div className='lg:w-1/2 mt-2 hidden lg:block'>
        
            <ScrollingNews />
        </div>

        {/* right side */}
        <div className='lg:w-1/2 md:ml-2 lg:ml-0 '>
          <Suspense fallback={<LoadingSpinner />}>
            <BannerItem />
          </Suspense>
        </div>
      </Suspense>
    </main>
  );
}
export default Banner