export default function BannerSkeleton() {
  return (
    <div className='scroll-container animate-pulse'>
      <div className='scroll-content '>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className='mb-12 space-y-2 '>
            <div className='h-8 w-1/2 bg-gray-700 rounded-lg mb-2' />
            <div className='h-36 w-5/6 bg-gray-800 rounded-lg mb-1' />
            <div className='h-4 w-3/4 bg-gray-600 rounded-lg' />
          </div>
        ))}
      </div>
    </div>
  );
}
