export default function BannerSkeleton2() {
  return (
    <div className='scroll-container animate-pulse'>
      <div className='scroll-content '>
        {Array.from({ length: 1 }).map((_, idx) => (
          <div
            key={idx}
            className='space-y-8 min-h-[75vh] flex flex-col justify-center '
          >
            <div className='h-48 w-5/6 bg-gray-700 rounded-lg mb-2 mx-auto' />
            <div className='h-80 w-full bg-gray-800 rounded-lg mb-1' />
            {/* <div className='h-4 w-3/4 bg-gray-600 rounded-lg' /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
