import q1 from '../../assets/q1.webp';
import PageTitle from '../../components/PageTitle';

const AboutUs = () => {
  return (
    <div>
      <PageTitle title='About Us' />
      <div className=' px-4 mx-6 lg:px-8 py-4 bg-blue-100 bg-opacity-10 rounded-md'>
        <div className='flex flex-col-reverse lg:flex-row gap-6 items-center justify-center  '>
          <div className='lg:w-1/3'>
            <img className=' lg:h-[360px] lg:mt-4 rounded-xl' src={q1} alt='' />
          </div>
          {/* About us text */}
          <div className='w-full lg:w-2/3 lg:mt-4'>
            <div className='space-y-6 leading-relaxed tracking-wider'>
              <p className='text-justify text-sm'>
                Welcome to Tech Insights, your ultimate destination for the
                latest developments in the ever-evolving world of technology. As
                a dedicated platform, our mission is to keep you at the
                forefront of innovation by delivering breaking news, in-depth
                analysis, and expert commentary on everything related to tech.
                From revolutionary advancements in artificial intelligence and
                cybersecurity to the latest trends in software development and
                programming, we strive to provide content that not only informs
                but also inspires.
              </p>
              <p className='text-justify text-sm'>
                At Tech Insights, we understand that technology is shaping the
                future, and staying informed is essential. Whether you're an IT
                professional, a seasoned developer, or someone who’s passionate
                about the digital age, our platform is designed to cater to your
                thirst for knowledge. We cover a wide range of topics, ensuring
                that there's something for everyone, no matter where your tech
                interests lie.
              </p>
              <p className='text-justify text-sm'>
                Whether you’re looking for the latest tech news, need advice on
                coding, or want to learn about the newest trends in AI and
                cybersecurity, Tech Insights is here to be your guide. Join us
                as we explore the future, one groundbreaking innovation at a
                time.
              </p>
              <p className='text-justify text-sm'>
                Stay informed. Stay inspired. Stay ahead with Tech Insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
