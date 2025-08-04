'use client';
import React from 'react';

import GenInput from '@/components/gen-input/gen-input';
import { Button } from '@/components/ui/button';

import { useForgotPasswordReset } from '@/app/(auth)/forgot-password/_hooks/useForgotPasswordReset';

const ForgotPasswordPage = () => {
  const { formik, getInputProps, isLoading } = useForgotPasswordReset();
  return (
    <div className='flex-1 h-full flex flex-col items-center w-full'>
      <form
        onSubmit={formik.handleSubmit}
        className='px-5 flex flex-col items-center text-center w-full mt-5 space-y-4'
      >
        {/* <VerificationRocket /> */}
        <p className='text-sm text-black/60 mt-1'>Enter your new password</p>
        <GenInput
          id='newPassword'
          label='New Password'
          type='password'
          {...getInputProps('newPassword')}
        />
        <GenInput
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          {...getInputProps('confirmPassword')}
        />
        <Button className='w-full' type='submit' isLoading={isLoading}>
          Verify
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
