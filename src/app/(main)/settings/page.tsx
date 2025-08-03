'use client';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import NavigationHeader from '@/components/navigation-header';

import { ROBO_URL } from '@/utils';
import { appRoutes } from '@/utils/routes';

const SettingsPage = () => {
  const router = useRouter();

  const { data: sessionData } = useSession();
  return (
    <div>
      <NavigationHeader
        handleBack={() => router.back()}
        header='User Profile'
      />
      <div className='p-5 space-y-3'>
        <button
          className='flex items-center justify-between border rounded-full p-3 w-full text-start'
          onClick={() => router.push(appRoutes.settings.profile.root)}
        >
          <div className='flex items-center space-x-2'>
            <Image
              src={`${ROBO_URL}/${sessionData?.user.firstName}`}
              alt='avatar'
              width={48}
              height={48}
              className='aspect-square'
            />
            <div>
              <p className='capitalize font-medium'>
                {sessionData?.user.firstName} {sessionData?.user.lastName}
              </p>
              <p className='text-xs text-black/70 mt-0.5'>
                Manage profile details
              </p>
            </div>
          </div>
          <ChevronRight />
        </button>
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
          <ChevronRight className='w-4 h-4' />
        </a>
      </div>
    </div>
  );
};

export default SettingsPage;
