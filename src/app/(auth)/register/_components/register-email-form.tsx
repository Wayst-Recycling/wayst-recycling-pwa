import Link from 'next/link';
import React from 'react';

import Logo from '@/components/assets/logo';
import GenInput from '@/components/gen-input/gen-input';
import { Button } from '@/components/ui/button';

import { REGISTER_EMAIL_KEY } from '@/actions/auth/auth-constants.server';
import { useRegisterEmailForm } from '@/app/(auth)/register/_hooks/useRegisterEmailForm';
import { appRoutes } from '@/utils/routes';

const RegisterEmailForm = () => {
  const { formik, getInputProps } = useRegisterEmailForm();
  return (
    <div className='min-h-screen flex flex-col px-5 pt-5'>
      <div className='flex-grow'>
        <Logo />
        <p className='mt-16 text-[2rem] font-semibold text-green-text'>
          Join the movement in just a few taps
        </p>
        <p className='text-sm mt-2 text-black/50'>
          Create your free account and start earning from your waste today
        </p>

        <form className='mt-7 flex flex-col' onSubmit={formik.handleSubmit}>
          <GenInput
            id={REGISTER_EMAIL_KEY}
            label='Email Address'
            type='email'
            placeholder='Enter your email address'
            {...getInputProps(REGISTER_EMAIL_KEY)}
          />
          <Button className='my-5' type='submit'>
            Register
          </Button>
          <span className='text-sm text-black/70'>
            Already have an account?{' '}
            <Link
              className='font-medium text-sm text-brand-primary'
              href={appRoutes.auth.login}
            >
              Login
            </Link>
          </span>
        </form>
      </div>

      <div className='my-8'>
        <p className='text-black/70 text-sm'>
          By signing up for a free account with{' '}
          <span className='text-sm font-medium text-brand-primary'>Wayst</span>,
          you agree to our{' '}
          <span className='text-sm font-medium text-brand-primary'>
            Terms of Service
          </span>{' '}
          and{' '}
          <span className='text-sm font-medium text-brand-primary'>
            Privacy Policy.
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterEmailForm;
