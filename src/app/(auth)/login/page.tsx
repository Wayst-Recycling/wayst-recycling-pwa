import Link from 'next/link';
import React from 'react';

import Logo from '@/components/assets/logo';
import GenInput from '@/components/gen-input/gen-input';
import { Button } from '@/components/ui/button';

import { appRoutes } from '@/utils/routes';

const LoginPage = () => {
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

        <form className='mt-7 space-y-4 flex flex-col'>
          <GenInput
            id='email'
            label='Email Address'
            placeholder='Enter your email address'
          />
          <GenInput
            containerClassName=''
            id='password'
            label='Password'
            type='password'
            placeholder='Enter your password'
          />
          <Button className=''>Register</Button>
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
