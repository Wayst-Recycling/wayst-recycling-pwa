'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import NavigationHeader from '@/components/navigation-header';

import { useAppDispatch, useAppSelector } from '@/store';

import ForgotPaswordEmailForm from '@/app/(auth)/forgot-password/_components/forgot-password-email-form';
import ForgotPasswordVerificationPage from '@/app/(auth)/forgot-password/_components/forgot-password-verification-page';
import { FORGOT_PASSWORD_REDUCER_PATH } from '@/slices/constants';
import { updateForgotPasswordStage } from '@/slices/forgot-password.slice';
import { appRoutes } from '@/utils/routes';

const ForgotPaswordPage = () => {
  const { forgotPasswordValues } = useAppSelector(
    (state) => state[FORGOT_PASSWORD_REDUCER_PATH],
  );
  const stage = forgotPasswordValues.stage;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleBack = () => {
    if (stage === 'email') {
      router.push(appRoutes.auth.login);
    } else if (stage === 'verification') {
      dispatch(updateForgotPasswordStage('email'));
    }
  };
  return (
    <div className='min-h-screen flex flex-col'>
      <NavigationHeader handleBack={handleBack} header='Forgot password' />
      {stage === 'email' && <ForgotPaswordEmailForm />}
      {stage === 'verification' && <ForgotPasswordVerificationPage />}
    </div>
  );
};

export default ForgotPaswordPage;
