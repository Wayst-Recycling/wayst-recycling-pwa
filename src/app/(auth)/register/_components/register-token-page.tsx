'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import OtpInput from '@/components/gen-input/otp-input';
import NavigationHeader from '@/components/navigation-header';
import { Button } from '@/components/ui/button';

import { useAppDispatch, useAppSelector } from '@/store';

import { useResendOtpMutation } from '@/actions/auth/auth-api.actions';
import { REGISTER_EMAIL_KEY } from '@/actions/auth/auth-api.constants';
import { useRegisterOtpForm } from '@/app/(auth)/register/_hooks/useRegisterOtpForm';
import { REGISTER_REDUCER_PATH } from '@/slices/constants';
import { updateRegisterStage } from '@/slices/register.slice';
import { handleErrors } from '@/utils/error';
import { appRoutes } from '@/utils/routes';

const RESEND_TIMEOUT = 120; // seconds

const RegisterTokenPage = () => {
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(updateRegisterStage('bio'));
  };
  const router = useRouter();
  const { registerValues } = useAppSelector(
    (state) => state[REGISTER_REDUCER_PATH],
  );

  const { formik, getSelectProps, isLoadingVerifyEmail } = useRegisterOtpForm();

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT);

  const [resendVerificationLink, { isLoading: isLoadingVerificationLink }] =
    useResendOtpMutation();

  const handleResend = async () => {
    try {
      await resendVerificationLink({
        email: registerValues[REGISTER_EMAIL_KEY],
      }).unwrap();
      toast.success('Link resent');
      router.replace(appRoutes.auth.register);
    } catch (err) {
      handleErrors(err);
    }
  };

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
      <form onSubmit={formik.handleSubmit}>
        <NavigationHeader
          header='Register as a new user'
          handleBack={handleBack}
        />
        <p className='text-xs mt-5 text-black/70 px-5'>
          Check your email for a verification code to activate your account and
          start earning cUSD or NGN for recycling with Wayst.♻️
        </p>
        <div className='px-5 mt-5 space-y-4 flex flex-col items-end'>
          <div className='flex justify-center w-full'>
            <OtpInput
              id='token'
              {...getSelectProps('token')}
              numberOfSlots={4}
            />
          </div>
          <button
            className='text-brand-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor: pointer'
            onClick={handleResendClick}
            disabled={secondsLeft > 0 || isLoadingVerificationLink}
          >
            {secondsLeft > 0
              ? `Resend in ${formatTime(secondsLeft)}`
              : 'Resend Link'}
          </button>
          <Button
            className='w-full'
            type='submit'
            isLoading={isLoadingVerifyEmail}
          >
            Verify
          </Button>
        </div>
      </form>
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
