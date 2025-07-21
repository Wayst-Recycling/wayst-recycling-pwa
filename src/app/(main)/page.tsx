'use client';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import CurrencySelect from '@/app/(main)/_components/currency-select';
import FormatBalance from '@/app/(main)/_components/format-balance';
import { TotalEarningsTooltip } from '@/app/(main)/_components/total-earnings-tooltip';
import TransactionCard from '@/app/(main)/_components/transaction-card';
import { ROBO_URL } from '@/utils';
import { formatcUsd } from '@/utils/format';

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center px-5'>
      <div className='mx-auto mt-5 flex w-full flex-col pb-20'>
        <div className='flex w-full items-center justify-start space-x-2'>
          <Image
            src={`${ROBO_URL}/ss`}
            alt='avatar'
            width={40}
            height={40}
            className='aspect-square'
          />
          <div>
            <p className='text-xs'>Hello, 👋🏿</p>
            <p className='text-base font-medium'>Welcome to Wayst!</p>
          </div>
        </div>
        <div className='mt-4 flex flex-col items-center space-y-9'>
          <CurrencySelect />

          <div className='space-y-2'>
            <div className='flex items-end space-x-1'>
              <p className='text-xs'>cUSD</p>
              <FormatBalance
                isLoading={false}
                value={Number(formatcUsd(78.765))}
                decimalClassName='text-xl font-semibold'
                wholeNumberClassName='text-4xl font-semibold'
              />
            </div>
            <TotalEarningsTooltip />
          </div>

          <Button
            variant='secondary'
            className='flex items-center space-x-0.5 px-12'
          >
            <ArrowUpRight className='text-brand-primary w-5 aspect-square' />
            <p>Withdraw</p>
          </Button>
        </div>

        <div className='mt-5 flex flex-col'>
          <p className='text-xl font-semibold'>Quick Actions</p>
          <div className='mt-3 grid grid-cols-3 gap-3'>
            <Link
              href='/'
              className='flex flex-col items-center rounded-xl border bg-white/10 py-3'
            >
              <Image
                src='/images/pickup.png'
                alt='pickup'
                className='relative aspect-square object-contain'
                width={74}
                height={74}
              />
              <p className='mt-2 text-xs font-medium'>Pickup</p>
            </Link>
            <Link
              href='/'
              className='flex flex-col items-center rounded-xl border bg-white/10 py-3'
            >
              <Image
                src='/images/gift.png'
                alt='gift'
                className='relative aspect-square object-contain'
                width={74}
                height={74}
              />
              <p className='mt-2 text-xs font-medium'>Daily Claim</p>
            </Link>
            <Link
              href='/'
              className='flex flex-col items-center rounded-xl border bg-white/10 py-3'
            >
              <Image
                src='/images/dropoff.png'
                alt='dropoff'
                className='relative aspect-square object-contain'
                width={74}
                height={74}
              />
              <p className='mt-2 text-xs font-medium'>Dropoff</p>
            </Link>
          </div>
        </div>

        <div className='mt-4 flex flex-col space-y-3'>
          <div className='flex items-center justify-between'>
            <p className='text-xl font-semibold'>Transaction History</p>
            <Link
              href='/'
              className='rounded-full border bg-white p-1.5 shadow-md'
            >
              <ChevronRight size={12} />
            </Link>
          </div>
          {/* {transactions &&
            !isLoadingGetTransactions &&
            transactions.data
              .slice(0, 3)
              .map((transaction) => ( */}
          <TransactionCard transaction={{}} />
          {/* ))} */}
          {/* {!transactions && isLoadingGetTransactions && <Loader />} */}
          {/* {!isLoadingGetTransactions && !transactions && (
            <div className="mx-auto flex max-w-[60%] flex-col items-center text-center">
              <img
                className="mx-auto pt-10"
                src="/assets/garbage.png"
                alt="empty"
              />
              <p className="text-sm font-semibold">No transaction history</p>
              <p className="text-xs text-gray-500">
                Your data history is currently empty. Start recycling today to
                see your impact.
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
