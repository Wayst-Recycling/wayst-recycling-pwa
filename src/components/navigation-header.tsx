import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

type Props = {
  header?: string;
  handleBack?: () => void;
};

const NavigationHeader = ({ header, handleBack }: Props) => {
  return (
    <div className='flex items-center space-x-4 border-b pt-5 pb-3 px-5'>
      <button
        onClick={handleBack}
        className='border w-10 aspect-square flex justify-center items-center border-black/10 rounded-full '
      >
        <BsArrowLeft className='w-6' />
      </button>
      <p className='text-xl font-semibold'>{header}</p>
    </div>
  );
};

export default NavigationHeader;
