'use client';
import React from 'react';

import { useAppSelector } from '@/store';

import RegisterBioForm from '@/app/(auth)/register/_components/register-bio-form';
import RegisterEmailForm from '@/app/(auth)/register/_components/register-email-form';
import RegisterTokenPage from '@/app/(auth)/register/_components/register-token-page';
import { REGISTER_REDUCER_PATH } from '@/slices/constants';

const RegisterPage = () => {
  const { registerValues } = useAppSelector(
    (state) => state[REGISTER_REDUCER_PATH],
  );
  const stage = registerValues.stage;
  return (
    <>
      {stage === 'email' && <RegisterEmailForm />}
      {stage === 'bio' && <RegisterBioForm />}
      {stage === 'verification' && <RegisterTokenPage />}
    </>
  );
};

export default RegisterPage;
