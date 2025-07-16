import React from 'react';
import Marquee from 'react-fast-marquee';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..


const MottoMarquee = () => {
  const mottos = [
    "Uncovering Tomorrow's Technology Today.",
    'Where Innovation Meets Analysis.',
    'Your Guide to the Future of Tech.',
    'Deep Dives into Digital Trends.',
    'Navigating the Tech Frontier.',
    'Insightful Perspectives on Tech Evolution.',
    'Decoding the Digital World',
    'Pioneering Knowledge in Technology.',
    'Your Source for Cutting-Edge Insights.',
    'Shaping the Future with Tech Analysis.',
  ];

  return (
    <div>
      <Marquee gradient={false} speed={50}>
        {mottos.map((motto, index) => (
          <span
            key={index}
           className='font-semibold mr-6'
          >
            {motto}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default MottoMarquee;
