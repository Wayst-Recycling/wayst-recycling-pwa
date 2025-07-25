'use client';

import ScheduleForm from '@/app/(main)/schedule/_components/schedule-form';

const PickupPage = () => {
  return (
    <div className='p-5 pb-32'>
      <ScheduleForm category='pickup' />
    </div>
  );
};

export default PickupPage;
