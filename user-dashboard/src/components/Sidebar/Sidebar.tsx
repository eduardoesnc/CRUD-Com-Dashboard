'use client'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import SideBarIcon from '@/components/Sidebar/SidebarIcon';

import TableChartIcon from '@mui/icons-material/TableChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';


export default function SideBar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSidebarClick = () => {
    setIsExpanded(true);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.sidebar')) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isExpanded]);

  const menuItems = [
    { icon: <TableChartIcon sx={{ color: 'white' }} />, text: 'Home', href: '/' },
    { icon: <AnalyticsIcon sx={{ color: 'white' }} />, text: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen ${isExpanded ? 'w-64' : 'w-24'} flex flex-col
                  bg-[#182335] dark:bg-[#182335] shadow-lg transition-width duration-300 sidebar z-50 `}
                    onClick={handleSidebarClick}>
        <h3 className='py-8 text-center font-bold text-xl text-white'>CRUD</h3>
        {menuItems.map((item) => (
          
          <SideBarIcon style={`${isExpanded ? '!w-[80%] !justify-start' : ''}`}
            key={item.text}
            icon={item.icon}
            text={item.text}
            isActive={pathname === item.href}
            showText={isExpanded}
            link={item.href}
          />
          
      ))}
    </div>
  );
};