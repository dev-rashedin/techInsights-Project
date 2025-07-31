import { Suspense } from "react";
import ScrollingNews from "./ScrollingNews";
import BannerItem from "../../components/BannerItem";
import BannerSkeleton from "../../components/BannerSkeleton";


const Banner = () => {
  return (
    <main className='flex flex-col-reverse lg:flex-row gap-8 px-4  mx-auto md:px-8'>
      {/* left side */}
      <div className='lg:w-1/2 mt-2 hidden lg:block'>
        <Suspense fallback={<BannerSkeleton />}>
          <ScrollingNews />
        </Suspense>
      </div>

      <BannerItem/>
    </main>
  );
}
export default Banner