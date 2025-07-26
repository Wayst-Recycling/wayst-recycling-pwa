'use client';
import { useRouter } from 'next/navigation';

import NavigationHeader from '@/components/navigation-header';

import { useGetTotalEarningsQuery } from '@/actions/wallet/wallet-api.actions';
import TransactionList from '@/app/(main)/history/_components/transaction-list';
import { formatcUsd } from '@/utils/format';

const HistoryPage = () => {
  const { data: totalEarnings } = useGetTotalEarningsQuery();

  const router = useRouter();
  return (
    <div className=''>
      <NavigationHeader
        handleBack={() => router.back()}
        header='Transaction history'
      />
      <div className='p-5'>
        <p className='mt-4 text-xs'>
          Total Transaction Earnings:{' '}
          <span className='font-medium text-[#008343]'>
            cUSD {formatcUsd(totalEarnings)}
          </span>
        </p>
        <TransactionList />
      </div>
    </div>
  );
};

export default HistoryPage;
