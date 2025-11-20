'use client';
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { FiFileText } from 'react-icons/fi';
import { HiHome } from 'react-icons/hi2';
import { IoCalendarOutline } from 'react-icons/io5';

import { appMaxWidth } from '@/app/_utils/helpers';
import FooterLink from '@/app/(main)/_components/footer-link';
import { appRoutes } from '@/utils/routes';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen'>
      {children}
      <div
        className='fixed bottom-0 flex w-full items-center justify-between border-t bg-white px-[13%] 2xl:px-[5%] py-6'
        style={{ maxWidth: appMaxWidth }}
      >
        <FooterLink index icon={HiHome} text='Home' link={appRoutes.home} />
        <FooterLink
          icon={IoCalendarOutline}
          text='Schedule'
          link={appRoutes.schedule.root}
        />
        <FooterLink icon={FiFileText} text='History' link={appRoutes.history} />
        <FooterLink
          icon={FaUser}
          text='Profile'
          link={appRoutes.settings.root}
        />
      </div>
    </div>
  );
};

export default HomeLayout;
