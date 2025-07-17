'use client';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import NavigationHeader from '@/components/navigation-header';

const ProfilePage = () => {
  const router = useRouter();
  return (
    <div>
      <NavigationHeader handleBack={() => router.back()} header='Profile' />
      <div className='p-5 space-y-3'>
        <a
          href='https://t.me/+kBh3jiVW4OFmNDJk'
          className='flex items-center justify-between rounded-lg bg-white p-3'
        >
          <div className='flex items-center space-x-2'>
            <Image
              src='/svg/telegram.svg'
              alt='telegram'
              width={40}
              height={40}
            />
            <div>
              <p className='text-sm'>Support</p>
              <p className='text-xs text-gray-500'>
                Need help? Reach out to us on Telegram.
              </p>
            </div>
          </div>
          <ChevronRight />
        </a>
      </div>
    </div>
  );
};

export default ProfilePage;
