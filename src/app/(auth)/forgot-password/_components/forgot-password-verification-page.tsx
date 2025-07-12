import React from 'react';

import VerificationRocket from '@/components/assets/verification-rocket';

const ForgotPasswordVerificationPage = () => {
  return (
    <div className='flex-1 h-full flex flex-col justify-center'>
      <div className='px-5 flex flex-col items-center text-center'>
        <VerificationRocket />
        <p className='text-xl font-medium mt-4'>Almost there!</p>
        <p className='text-sm text-black/60 mt-1'>
          Check your email to reset your account password.♻️
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordVerificationPage;
