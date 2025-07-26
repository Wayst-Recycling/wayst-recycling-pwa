'use client';
import Link from 'next/link';
import React from 'react';

import Logo from '@/components/assets/logo';
import GenInput from '@/components/gen-input/gen-input';
import { Button } from '@/components/ui/button';

import {
  LOGIN_EMAIL_KEY,
  LOGIN_PASSWORD_KEY,
} from '@/actions/auth/auth-api.constants';
import { useLoginForm } from '@/app/(auth)/login/_hooks/useLogin';
import { appRoutes } from '@/utils/routes';

const LoginPage = () => {
  const { formik, getInputProps, isLoading } = useLoginForm();
  return (
    <div className='min-h-screen flex flex-col px-5 pt-5'>
      <div className='flex-grow'>
        <Logo />
        <p className='mt-16 text-[2rem] font-semibold text-green-text'>
          Welcome back to
          <br /> Wayst!
        </p>
        <p className='text-sm mt-2 text-black/50'>
          Log in to access your account and continue earning from your waste.
        </p>

        <form
          className='mt-7 space-y-4 flex flex-col'
          onSubmit={formik.handleSubmit}
        >
          <GenInput
            id={LOGIN_EMAIL_KEY}
            label='Email Address'
            placeholder='Enter your email address'
            {...getInputProps(LOGIN_EMAIL_KEY)}
          />
          <GenInput
            containerClassName=''
            id={LOGIN_PASSWORD_KEY}
            label='Password'
            type='password'
            placeholder='Enter your password'
            {...getInputProps(LOGIN_PASSWORD_KEY)}
          />
          <Button type='submit' isLoading={isLoading} className=''>
            Login
          </Button>
          <span className='text-sm text-black/70'>
            Don't have an account?{' '}
            <Link
              className='font-medium text-sm text-brand-primary'
              href={appRoutes.auth.register}
            >
              Register
            </Link>
          </span>
          <Link
            className='font-medium text-sm text-brand-primary'
            href={appRoutes.auth.forgotPassword}
          >
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
