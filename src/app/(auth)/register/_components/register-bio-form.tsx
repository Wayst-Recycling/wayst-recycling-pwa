'use client';
import Link from 'next/link';
import React from 'react';

import GenInput from '@/components/gen-input/gen-input';
import NavigationHeader from '@/components/navigation-header';
import { Button } from '@/components/ui/button';

import { useAppDispatch } from '@/store';

import { updateRegisterStage } from '@/slices/register.slice';
import { appRoutes } from '@/utils/routes';

const RegisterBioForm = () => {
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(updateRegisterStage('email'));
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <NavigationHeader
        header='Register as a new user'
        handleBack={handleBack}
      />

      <div className='px-5 flex flex-col flex-grow justify-between'>
        <div className='flex-grow'>
          <form className='mt-5 flex flex-col space-y-4'>
            <GenInput
              id='firstName'
              label='First Name'
              placeholder='Enter your first name'
            />

            <GenInput
              id='lastName'
              label='Last Name'
              placeholder='Enter your last name'
            />

            <GenInput
              id='password'
              label='Password'
              type='password'
              placeholder='Enter your password'
            />

            <Button className='my-5'>Register</Button>
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
            <span className='text-sm font-medium text-brand-primary'>
              Wayst
            </span>
            , you agree to our{' '}
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
    </div>
  );
};

export default RegisterBioForm;
