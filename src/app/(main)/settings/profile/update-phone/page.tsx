'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Country, getCountryCallingCode } from 'react-phone-number-input';

import { InputPhone } from '@/components/gen-input/input-phone';
import NavigationHeader from '@/components/navigation-header';
import { Button } from '@/components/ui/button';

import {
  EDIT_PROFILE_DIAL_CODE_KEY,
  EDIT_PROFILE_PHONE_KEY,
} from '@/actions/user/user-api.constants';
import { useUpdatePhone } from '@/app/(main)/settings/profile/update-phone/_hooks/useUpdatePhone';

const UpdatePhone = () => {
  const router = useRouter();
  const { formik, getSelectProps } = useUpdatePhone();
  return (
    <div>
      <NavigationHeader
        handleBack={() => router.back()}
        header='Update Phone Number'
      />
      <div className='p-5'>
        <p className='text-sm text-black/70'>
          Change the number linked to your account.
        </p>
        <form className='mt-5 space-y-4' onSubmit={formik.handleSubmit}>
          <InputPhone
            id={EDIT_PROFILE_PHONE_KEY}
            label='Phone Number'
            {...getSelectProps(EDIT_PROFILE_PHONE_KEY)}
            onCountryChange={(value) => {
              const callingCode = getCountryCallingCode(value as Country);
              formik.setFieldValue(
                EDIT_PROFILE_DIAL_CODE_KEY,
                `+${callingCode}`,
              );
            }}
          />
          <Button type='submit' className='w-full'>
            Update Phone Number
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePhone;
