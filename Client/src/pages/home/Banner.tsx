import { Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import ScrollingNews from "./ScrollingNews";
import BannerItem from "./BannerItem";
import BannerSkeleton from "../../components/BannerSkeleton";
import BannerSkeleton2 from '../../components/BannerSkeleton2';


const Banner = () => {
  return (
    <main className='flex flex-col-reverse lg:flex-row gap-8 px-4  mx-auto md:px-8 -pt-40'>
      {/* left side */}
      <div className='lg:w-1/2 mt-2 hidden lg:block'>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Suspense fallback={<BannerSkeleton />}>
            <ScrollingNews />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* right side */}
      <div className='lg:w-1/2 md:ml-2 lg:ml-0 '>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Suspense fallback={<BannerSkeleton2 />}>
            <BannerItem />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}
export default Banner