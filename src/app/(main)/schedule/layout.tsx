'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import NavigationHeader from '@/components/navigation-header';

import { appRoutes } from '@/utils/routes';

const ScheduleLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <NavigationHeader
        handleBack={() => router.back()}
        header={
          pathname === appRoutes.schedule.pickup
            ? 'Schedule Pickup'
            : pathname === appRoutes.schedule.dropoff
              ? 'Schedule Dropoff'
              : 'Schedule'
        }
      />
      {children}
    </>
  );
};

export default ScheduleLayout;
