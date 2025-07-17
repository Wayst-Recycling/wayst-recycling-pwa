'use client';
import { useRouter } from 'next/navigation';

import NavigationHeader from '@/components/navigation-header';

import { formatcUsd } from '@/utils/format';

const HistoryPage = () => {
  // const { data: totalEarning } = useGetTotalEarning(address as string);

  // const { data: transactions, isPending: isLoadingGetTransactions } =
  //   useGetTransactions({ ox: address as string });

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
            cUSD {formatcUsd(12)}
          </span>
        </p>
        {/* <div className="mt-10 flex flex-col items-center space-y-2">
        {transactions &&
          !isLoadingGetTransactions &&
          transactions.data.map((transaction) => (
            <TransactionCard transaction={transaction} />
          ))}
        {!transactions && isLoadingGetTransactions && <Loader />}
        {!isLoadingGetTransactions && !transactions && (
          <div className="mx-auto flex max-w-[60%] flex-col items-center text-center">
            <img
              className="mx-auto pt-10"
              src="/assets/garbage.png"
              alt="empty"
            />
            <p className="text-sm font-semibold">No transaction history</p>
            <p className="text-xs text-gray-500">
              Your data history is currently empty. Start recycling today to see
              your impact.
            </p>
          </div>
        )}
      </div> */}
      </div>
    </div>
  );
};

export default HistoryPage;
