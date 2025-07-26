'use client';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { useAppSelector } from '@/store';

import { useGetConfigurationQuery } from '@/actions/configuration/configuration-api.action';
import { useGetWalletQuery } from '@/actions/wallet/wallet-api.actions';
import CurrencySelect from '@/app/(main)/_components/currency-select';
import FormatBalance from '@/app/(main)/_components/format-balance';
import { TotalEarningsTooltip } from '@/app/(main)/_components/total-earnings-tooltip';
import { currencies } from '@/app/(main)/_utils/constants';
import TransactionList from '@/app/(main)/history/_components/transaction-list';
import { CURRENCY_REDUCER_PATH } from '@/slices/constants';
import { ROBO_URL } from '@/utils';
import { formatcUsd } from '@/utils/format';
import { appRoutes } from '@/utils/routes';

const HomePage = () => {
  const { data, isLoading } = useGetWalletQuery();
  const { data: sessionData } = useSession();

  const { activeCurrency } = useAppSelector(
    (state) => state[CURRENCY_REDUCER_PATH],
  );

  const { data: configurationResponse } = useGetConfigurationQuery();

  const currency = currencies.find((x) => x.id === activeCurrency);

  const amount = () => {
    if (currency && currency.index && data && data.data.CELO) {
      return parseFloat(formatcUsd(parseFloat(data.data.CELO as string)));
    } else if (currency && currency.exchange && configurationResponse && data) {
      const rate =
        configurationResponse.data.find((x) => x.type === currency.exchange)
          ?.value ?? 0;
      return parseFloat(formatcUsd(Number(rate) * parseFloat(data.data.CELO)));
    } else {
      return 0;
    }
  };

  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center px-5'>
      <div className='mx-auto mt-5 flex w-full flex-col pb-20'>
        <div className='flex w-full items-center justify-start space-x-2'>
          <Image
            src={`${ROBO_URL}/${sessionData?.user.firstName}`}
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
            <div className='flex items-end justify-center space-x-1'>
              <p className='text-xs'>{currency?.title}</p>
              <FormatBalance
                isLoading={isLoading}
                value={amount()}
                decimalClassName='text-xl font-semibold'
                wholeNumberClassName='text-4xl font-semibold'
              />
            </div>
            <TotalEarningsTooltip />
          </div>

          <Button
            variant='secondary'
            className='flex items-center space-x-0.5 px-12'
            onClick={() => router.push(appRoutes.withdraw)}
          >
            <ArrowUpRight className='text-brand-primary w-5 aspect-square' />
            <p>Withdraw</p>
          </Button>
        </div>

        <div className='mt-5 flex flex-col'>
          <p className='text-xl font-semibold'>Quick Actions</p>
          <div className='mt-3 grid grid-cols-3 gap-3'>
            <Link
              href={appRoutes.schedule.pickup}
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
            <button
              onClick={() => toast.info('Coming Soon')}
              style={{ filter: 'grayscale(100%)' }}
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
            </button>
            <Link
              href={appRoutes.schedule.dropoff}
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
          <TransactionList home />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
