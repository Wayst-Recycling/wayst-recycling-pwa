'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import GenInput from '@/components/gen-input/gen-input';
import NavigationHeader from '@/components/navigation-header';
import { Button } from '@/components/ui/button';

import {
  CHANGE_PASSWORD_CONFIRM_PASSWORD_KEY,
  CHANGE_PASSWORD_CURRENT_PASSWORD_KEY,
  CHANGE_PASSWORD_NEW_PASSWORD_KEY,
} from '@/actions/user/user-api.constants';
import { useChangePassword } from '@/app/(main)/settings/profile/change-password/_hooks/useChangePassword';

const ChangePassword = () => {
  const router = useRouter();

  const { formik, getInputProps, isLoadingChangePassword } =
    useChangePassword();
  return (
    <div>
      <NavigationHeader
        handleBack={() => router.back()}
        header='Update Phone Number'
      />
      <div className='p-5'>
        <p className='text-sm text-black/70'>
          Set a new password to keep your account secure.
        </p>

        <form className='space-y-3 mt-5' onSubmit={formik.handleSubmit}>
          <GenInput
            id={CHANGE_PASSWORD_CURRENT_PASSWORD_KEY}
            label='Current Password'
            {...getInputProps(CHANGE_PASSWORD_CURRENT_PASSWORD_KEY)}
            type='password'
          />

          <GenInput
            id={CHANGE_PASSWORD_NEW_PASSWORD_KEY}
            label='New Password'
            {...getInputProps(CHANGE_PASSWORD_NEW_PASSWORD_KEY)}
            type='password'
          />

          <GenInput
            id={CHANGE_PASSWORD_CONFIRM_PASSWORD_KEY}
            label='Confirm New Password'
            {...getInputProps(CHANGE_PASSWORD_CONFIRM_PASSWORD_KEY)}
            type='password'
          />

          <Button
            type='submit'
            className='w-full'
            isLoading={isLoadingChangePassword}
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
