'use client';
import Image from 'next/image';
import Link from 'next/link';

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
    </div>
  );
};

export default SchedulePage;
