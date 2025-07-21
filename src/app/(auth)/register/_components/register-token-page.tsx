'use client';
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import VerificationRocket from '@/components/assets/verification-rocket';
import Loader from '@/components/loader';
import NavigationHeader from '@/components/navigation-header';
import { Button } from '@/components/ui/button';

import { useAppDispatch } from '@/store';

import { updateRegisterStage } from '@/slices/register.slice';
import { appRoutes } from '@/utils/routes';

const RESEND_TIMEOUT = 120; // seconds

const RegisterTokenPage = ({
  isLoading = false,
  isError = false,
  handleResend,
  isLoadingResend = false,
}: {
  isLoading?: boolean;
  isError?: boolean;
  handleResend?: () => void;
  isLoadingResend: boolean;
}) => {
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(updateRegisterStage('bio'));
  };
  const router = useRouter();

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleResendClick = () => {
    if (handleResend) handleResend();
    setSecondsLeft(RESEND_TIMEOUT);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <NavigationHeader
        header='Register as a new user'
        handleBack={handleBack}
      />

      <div className='px-5 flex flex-col items-center text-center'>
        {!isLoading && !isError && <VerificationRocket />}
        {isLoading && <Loader />}
        {isError && <XCircle className='w-96 aspect-square text-red-500' />}
        <p className='text-xl font-medium mt-4'>
          {!isLoading && !isError && "You're Almost In!"}
          {isError && 'Error completing registration'}
        </p>
        {!isLoading && !isError && (
          <p className='text-sm text-black/60 mt-1'>
            Check your email to activate your account and start earning cUSD or
            NGN for recycling with Wayst.♻️
          </p>
        )}
      </div>
      {handleResend && (
        <button
          className='text-brand-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor: pointer'
          onClick={handleResendClick}
          disabled={secondsLeft > 0 || isLoadingResend}
        >
          {secondsLeft > 0
            ? `Resend in ${formatTime(secondsLeft)}`
            : 'Resend Link'}
        </button>
      )}
      <div className='my-8 mx-5'>
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
