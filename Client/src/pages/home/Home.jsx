import { Helmet } from 'react-helmet-async';
import Logo from '../home/Logo'
import Banner from './Banner';
import PublisherSection from './PublisherSection';
import SubscriptionTeaser from './SubscriptionTeaser';
import AboutUs from './AboutUs';
import Poll from './Poll';
import useLoadUser from '../../hooks/useLoadUser';
import { useEffect, useState } from 'react';
import swalAlert from './../../api/swalAlert';
import HomeStats from './HomeStats';


const Home = () => {
  const [userData] = useLoadUser();

  const [alertCount, setAlertCount] = useState(0);
  const maxAlerts = 6;

  // show alert if user is not premium
  useEffect(() => {
    let premiumAlertInterval;

   
    if (userData && userData?.subscription !== 'premium') {
      premiumAlertInterval = setInterval(() => {
        if (alertCount < maxAlerts) {
          swalAlert('info', 'Please upgrade to premium for unlimited access');

          setAlertCount((prevCount) => prevCount + 1);
        } else {
          clearInterval(premiumAlertInterval);
        }
      }, 10000);
    }

    return () => {
      if (premiumAlertInterval) {
        clearInterval(premiumAlertInterval);
      }
    };
  }, [userData, alertCount]);

  return (
    <div className='space-y-8'>
      <Helmet>
        <title>Tech Insights || Home</title>
      </Helmet>
      <Logo />
      <Banner />
      <Poll />
     <HomeStats/>
      <SubscriptionTeaser />
      <AboutUs />
      <PublisherSection />
    </div>
  );
}
export default Home