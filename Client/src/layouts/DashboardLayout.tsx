import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/dashboard/Sidebar'
import { useState } from 'react';

const DashboardLayout = () => {
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () : void => {
    setActive(!isActive);
  };

  return (
    <div className='relative min-h-screen lg:flex bg-green-lantern bg-opacity-40 font-raleway'>
      {/* Sidebar */}
      <Sidebar isActive={isActive} handleToggle={handleToggle} />

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 lg:ml-64'>
        <div className='p-5 max-w-7xl mx-auto min-h-screen flex justify-center items-center'>
          <Outlet context={{isActive, handleToggle}} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout
