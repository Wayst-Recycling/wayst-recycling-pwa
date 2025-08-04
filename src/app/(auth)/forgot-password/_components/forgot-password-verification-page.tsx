'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import OtpInput from '@/components/gen-input/otp-input';
import { Button } from '@/components/ui/button';

import { useAppSelector } from '@/store';

import { useResendForgotPasswordMutation } from '@/actions/auth/auth-api.actions';
import { useForgotPasswordVerification } from '@/app/(auth)/forgot-password/_hooks/useForgotPasswordVerification';
import { FORGOT_PASSWORD_REDUCER_PATH } from '@/slices/constants';
import { handleErrors } from '@/utils/error';

const RESEND_TIMEOUT = 120; // seconds

const ForgotPasswordVerificationPage = () => {
  const { formik, getSelectProps, isLoading } = useForgotPasswordVerification();
  const { forgotPasswordValues } = useAppSelector(
    (state) => state[FORGOT_PASSWORD_REDUCER_PATH],
  );
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT);

  const [resendForgotPassword, { isLoading: isLoadingForgotPasswordResend }] =
    useResendForgotPasswordMutation();

  const handleResend = async () => {
    try {
      await resendForgotPassword({
        email: forgotPasswordValues.email,
      }).unwrap();
      toast.success('Token resent');
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
    <div className='flex-1 h-full flex flex-col items-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='px-5 flex flex-col space-y-4'
      >
        {/* <VerificationRocket /> */}
        <p className='text-xl font-medium mt-4'>Almost there!</p>
        <p className='text-sm text-black/60 mt-1'>
          Check your email to reset your account password.♻️
        </p>
        <OtpInput id='token' {...getSelectProps('token')} numberOfSlots={4} />
        <button
          className='text-brand-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor: pointer'
          onClick={handleResendClick}
          disabled={secondsLeft > 0 || isLoadingForgotPasswordResend}
        >
          {secondsLeft > 0
            ? `Resend in ${formatTime(secondsLeft)}`
            : 'Resend Link'}
        </button>
        <Button className='w-full' type='submit' isLoading={isLoading}>
          Verify
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordVerificationPage;
