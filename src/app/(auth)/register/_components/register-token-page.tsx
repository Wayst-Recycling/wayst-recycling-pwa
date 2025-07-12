'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import VerificationRocket from '@/components/assets/verification-rocket';
import NavigationHeader from '@/components/navigation-header';
import { Button } from '@/components/ui/button';

import { useAppDispatch } from '@/store';

import { updateRegisterStage } from '@/slices/register.slice';
import { appRoutes } from '@/utils/routes';

const RegisterTokenPage = () => {
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(updateRegisterStage('email'));
  };
  const router = useRouter();

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <NavigationHeader
        header='Register as a new user'
        handleBack={handleBack}
      />

      <div className='px-5 flex flex-col items-center text-center'>
        <VerificationRocket />
        <p className='text-xl font-medium mt-4'>You're Almost In!</p>
        <p className='text-sm text-black/60 mt-1'>
          Check your email to activate your account and start earning cUSD or
          NGN for recycling with Wayst.♻️
        </p>
      </div>
      <div className='my-8'>
        <Button
          className='w-full'
          variant='outline'
          onClick={() => router.push(appRoutes.auth.login)}
        >
          Return back to<span className='text-brand-primary'>Login</span>
        </Button>
      </div>
    </div>
  );
};

export default RegisterTokenPage;
