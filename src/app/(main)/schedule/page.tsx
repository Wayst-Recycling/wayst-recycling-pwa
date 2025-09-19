'use client';
import Image from 'next/image';
import Link from 'next/link';

import ScheduleList from '@/app/(main)/schedule/_components/schedule-list';
import { appRoutes } from '@/utils/routes';

const SchedulePage = () => {
  return (
    <div className='p-5'>
      <Link
        href={appRoutes.schedule.pickup}
        className='mt-5 flex w-full items-center space-x-2 rounded-xl border bg-white text-start'
      >
        <Image src='/images/pickup.png' alt='pickup' width={80} height={80} />
        <div className='p-5'>
          <p className='text-sm font-semibold'>Schedule Pickup</p>
          <p className='text-xs text-gray-500'>
            Schedule your next pickup to recycle waste easily. Tap to set a
            date!
          </p>
        </div>
      </Link>

      <Link
        href={appRoutes.schedule.dropoff}
        className='mt-5 flex w-full items-center space-x-2 border rounded-xl bg-white text-start'
      >
        <Image src='/images/dropoff.png' alt='dropoff' width={80} height={80} />
        <div className='p-5'>
          <p className='text-sm font-semibold'>Schedule Dropoff</p>
          <p className='text-xs text-gray-500'>
            Drop off your waste at your nearest location and earn rewards!
          </p>
        </div>
      </Link>

      <div className='mt-5 space-y-3'>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>Schedule History</p>
        </div>
        <ScheduleList />
      </div>
    </div>
  );
};

export default SchedulePage;
