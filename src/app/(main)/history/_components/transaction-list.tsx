'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import Loader from '@/components/loader';
import Pagination from '@/components/pagination';

import { useGetTransactionsQuery } from '@/actions/transactions/transaction-api.action';
import TransactionCard from '@/app/(main)/_components/transaction-card';

const TransactionList = ({ home = false }: { home?: boolean }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const { currentData: transactions, isFetching: isLoadingGetTransactions } =
    useGetTransactionsQuery({ page: Number(page) || 1, limit: home ? 3 : 10 });

  return (
    <div
      className={cn('mt-10 flex flex-col items-center space-y-2 pb-20', [
        home && 'mt-0',
      ])}
    >
      {transactions &&
        !isLoadingGetTransactions &&
        transactions.data.data.map((transaction) => (
          <TransactionCard transaction={transaction} key={transaction.id} />
        ))}
      {!home && <Pagination totalPages={transactions?.data.totalPages} />}
      {isLoadingGetTransactions && <Loader />}
      {!isLoadingGetTransactions && !transactions?.data.total && (
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

export default TransactionList;
