import Link from 'next/link';
import React from 'react';

import GenInput from '@/components/gen-input/gen-input';
import { Button } from '@/components/ui/button';

import { appRoutes } from '@/utils/routes';

const ForgotPaswordEmailForm = () => {
  return (
    <div className='min-h-screen flex flex-col px-5 pt-5'>
      <div className='flex-grow'>
        <p className='text-sm mt-2 text-black/50'>
          Enter your email to reset your password and regain access to your
          account.
        </p>

        <form className='mt-7 space-y-4 flex flex-col'>
          <GenInput
            id='email'
            label='Email Address'
            placeholder='Enter your email address'
          />

          <Button className=''>Send Reset Link</Button>
          <span className='text-sm text-black/70'>
            Remembered your password?{' '}
            <Link
              className='font-medium text-sm text-brand-primary'
              href={appRoutes.auth.login}
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgotPaswordEmailForm;
