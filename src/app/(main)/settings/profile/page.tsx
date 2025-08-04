'use client';
import { ChevronRight, LockOpen, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import NavigationHeader from '@/components/navigation-header';

import { appRoutes } from '@/utils/routes';

const ProfilePage = () => {
  const router = useRouter();

  return (
    <div>
      <NavigationHeader
        handleBack={() => router.push(appRoutes.settings.root)}
        header='Manage Profile Details'
      />
      <div className='p-5'>
        <p className='text-sm text-black/70'>
          Edit your personal information to keep your profile up to date.
        </p>
        <div className='mt-4 flex flex-col space-y-3'>
          <button
            onClick={() => router.push(appRoutes.settings.profile.updatePhone)}
            className='border p-3 rounded-xl w-full flex justify-between text-start'
          >
            <div className='flex items-center space-x-2'>
              <div className='bg-[#EEA3000D] rounded-full p-2'>
                <Phone className='w-5 h-5 text-[#A16E00]' />
              </div>
              <div>
                <p className='text-sm'>Change Phone Number</p>
                <p className='mt-0.5 text-xs text-black/70'>
                  Update your linked mobile number
                </p>
              </div>
            </div>
            <ChevronRight className='w-4 h-4' />
          </button>

          <button
            onClick={() =>
              router.push(appRoutes.settings.profile.changePassword)
            }
            className='border p-3 rounded-xl w-full flex justify-between text-start'
          >
            <div className='flex items-center space-x-2'>
              <div className='bg-[#BA92EE0D] rounded-full p-2'>
                <LockOpen className='w-5 h-5 text-[#58259A]' />
              </div>
              <div>
                <p className='text-sm'>Change Password</p>
                <p className='mt-0.5 text-xs text-black/70'>
                  Update your account login password
                </p>
              </div>
            </div>
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
