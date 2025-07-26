'use client';
import Link from 'next/link';
import React from 'react';
import { Country, getCountryCallingCode } from 'react-phone-number-input';

import GenInput from '@/components/gen-input/gen-input';
import { InputPhone } from '@/components/gen-input/input-phone';
import NavigationHeader from '@/components/navigation-header';
import { Button } from '@/components/ui/button';

import { useAppDispatch } from '@/store';

import {
  REGISTER_DIAL_CODE_KEY,
  REGISTER_FIRST_NAME_KEY,
  REGISTER_LAST_NAME_KEY,
  REGISTER_PASSWORD_KEY,
  REGISTER_PHONE_KEY,
} from '@/actions/auth/auth-api.constants';
import { useRegisterBioForm } from '@/app/(auth)/register/_hooks/useRegisterBioForm';
import { updateRegisterStage } from '@/slices/register.slice';
import { appRoutes } from '@/utils/routes';

const RegisterBioForm = () => {
  const dispatch = useAppDispatch();

  const { formik, getInputProps, handleSave, getSelectProps, isLoading } =
    useRegisterBioForm();

  const handleBack = () => {
    handleSave();
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
          <form
            className='mt-5 flex flex-col space-y-4'
            onSubmit={formik.handleSubmit}
          >
            <GenInput
              id={REGISTER_FIRST_NAME_KEY}
              label='First Name'
              placeholder='Enter your first name'
              {...getInputProps(REGISTER_FIRST_NAME_KEY)}
            />

            <GenInput
              id={REGISTER_LAST_NAME_KEY}
              label='Last Name'
              placeholder='Enter your last name'
              {...getInputProps(REGISTER_LAST_NAME_KEY)}
            />

            <InputPhone
              label='Phone Number'
              id={REGISTER_PHONE_KEY}
              {...getSelectProps(REGISTER_PHONE_KEY)}
              onCountryChange={(value) => {
                const callingCode = getCountryCallingCode(value as Country);
                formik.setFieldValue(REGISTER_DIAL_CODE_KEY, `+${callingCode}`);
              }}
            />

            <GenInput
              id={REGISTER_PASSWORD_KEY}
              label='Password'
              type='password'
              placeholder='Enter your password'
              {...getInputProps(REGISTER_PASSWORD_KEY)}
            />

            <GenInput
              id='confirmPassword'
              label='Confirm Password'
              type='password'
              placeholder='Enter your password'
              {...getInputProps('confirmPassword')}
            />

            <Button className='my-5' type='submit' isLoading={isLoading}>
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
