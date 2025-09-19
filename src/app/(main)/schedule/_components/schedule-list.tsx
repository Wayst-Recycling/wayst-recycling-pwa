'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import Loader from '@/components/loader';
import Pagination from '@/components/pagination';

import { useGetSchedulesQuery } from '@/actions/schedule/schedule-api.actions';
import ScheduleCard from '@/app/(main)/schedule/_components/schedule-card';

const ScheduleList = ({ home = false }: { home?: boolean }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const { currentData: schedules, isFetching: isLoadingGetSchedules } =
    useGetSchedulesQuery({ page: Number(page) || 1, limit: home ? 3 : 10 });

  return (
    <div
      className={cn('mt-10 flex flex-col items-center space-y-2 pb-20', [
        home && 'mt-0',
      ])}
    >
      {schedules &&
        !isLoadingGetSchedules &&
        schedules.data.data.map((transaction) => (
          <ScheduleCard transaction={transaction} key={transaction.id} />
        ))}
      {!home && <Pagination totalPages={schedules?.data.totalPages} />}
      {isLoadingGetSchedules && <Loader />}
      {!isLoadingGetSchedules && !schedules?.data.total && (
        <div className='mx-auto flex max-w-[60%] flex-col items-center text-center'>
          <Image
            className='mx-auto pt-10'
            src='/images/garbage.png'
            alt='empty'
            width={200}
            height={200}
          />
          <p className='text-sm font-semibold'>No transaction history</p>
          <p className='text-xs text-gray-500'>
            Your data history is currently empty. Start recycling today to see
            your impact.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
