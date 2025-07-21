/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import TransactionStatus from '@/app/(main)/_components/transaction-status';
import { formatcUsd } from '@/utils/format';

const TransactionCard = ({ transaction }: { transaction: any }) => {
  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        {(transaction.type === 'pickup' || transaction.type === 'dropoff') && (
          <div className='flex justify-between rounded-xl bg-white p-3'>
            <div className='flex items-center space-x-2'>
              {/* <Image
                src="/assets/plastic.svg"
                alt="plastic"
                className="aspect-square w-11"
              /> */}
              <div className='flex flex-col items-start'>
                <p className='capitalize'>{transaction.schedule?.material}</p>
                <div className='flex items-end space-x-1'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.0625 2.25V3.9375M12.9375 2.25V3.9375M2.25 14.0625V5.625C2.25 5.17745 2.42779 4.74823 2.74426 4.43176C3.06072 4.11529 3.48995 3.9375 3.9375 3.9375H14.0625C14.5101 3.9375 14.9393 4.11529 15.2557 4.43176C15.5722 4.74823 15.75 5.17745 15.75 5.625V14.0625M2.25 14.0625C2.25 14.5101 2.42779 14.9393 2.74426 15.2557C3.06072 15.5722 3.48995 15.75 3.9375 15.75H14.0625C14.5101 15.75 14.9393 15.5722 15.2557 15.2557C15.5722 14.9393 15.75 14.5101 15.75 14.0625M2.25 14.0625V8.4375C2.25 7.98995 2.42779 7.56073 2.74426 7.24426C3.06072 6.92779 3.48995 6.75 3.9375 6.75H14.0625C14.5101 6.75 14.9393 6.92779 15.2557 7.24426C15.5722 7.56073 15.75 7.98995 15.75 8.4375V14.0625'
                      stroke='#919191'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p className='text-xs text-[#919191]'>
                    {moment(transaction.schedule?.date).format('MMM Do YYYY')}
                  </p>
                  {/* <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4.5V9H12.375M15.75 9C15.75 9.88642 15.5754 10.7642 15.2362 11.5831C14.897 12.4021 14.3998 13.1462 13.773 13.773C13.1462 14.3998 12.4021 14.897 11.5831 15.2362C10.7642 15.5754 9.88642 15.75 9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 7.20979 2.96116 5.4929 4.22703 4.22703C5.4929 2.96116 7.20979 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z"
                  stroke="#919191"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs text-[#919191]">
                {moment(transaction.date).format('LT')}
              </p> */}
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center space-y-1'>
              <p className='text-sm font-medium'>
                cUSD{' '}
                {Number(transaction.amount).toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}
              </p>
              <TransactionStatus status={transaction.status} />
            </div>
          </div>
        )}
        {transaction.type === 'daily claim' && (
          <div key={transaction.id} className='mt-3 text-start'>
            <div className='mt-1 flex items-center justify-between rounded-lg bg-white p-3'>
              <div className='flex items-center space-x-2'>
                {/* <Image
                  src="/assets/gift.png"
                  alt="gift"
                  className="relative aspect-square w-11 object-contain"
                /> */}
                <div>
                  <p className='text-sm font-medium'>Daily Claim</p>
                  <div className='flex items-end space-x-1'>
                    <svg
                      width='18'
                      height='18'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M5.0625 2.25V3.9375M12.9375 2.25V3.9375M2.25 14.0625V5.625C2.25 5.17745 2.42779 4.74823 2.74426 4.43176C3.06072 4.11529 3.48995 3.9375 3.9375 3.9375H14.0625C14.5101 3.9375 14.9393 4.11529 15.2557 4.43176C15.5722 4.74823 15.75 5.17745 15.75 5.625V14.0625M2.25 14.0625C2.25 14.5101 2.42779 14.9393 2.74426 15.2557C3.06072 15.5722 3.48995 15.75 3.9375 15.75H14.0625C14.5101 15.75 14.9393 15.5722 15.2557 15.2557C15.5722 14.9393 15.75 14.5101 15.75 14.0625M2.25 14.0625V8.4375C2.25 7.98995 2.42779 7.56073 2.74426 7.24426C3.06072 6.92779 3.48995 6.75 3.9375 6.75H14.0625C14.5101 6.75 14.9393 6.92779 15.2557 7.24426C15.5722 7.56073 15.75 7.98995 15.75 8.4375V14.0625'
                        stroke='#919191'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p className='text-xs text-[#919191]'>
                      {moment(transaction.createdAt).format('MMM Do YYYY')}
                    </p>
                    <svg
                      width='18'
                      height='18'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M9 4.5V9H12.375M15.75 9C15.75 9.88642 15.5754 10.7642 15.2362 11.5831C14.897 12.4021 14.3998 13.1462 13.773 13.773C13.1462 14.3998 12.4021 14.897 11.5831 15.2362C10.7642 15.5754 9.88642 15.75 9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 7.20979 2.96116 5.4929 4.22703 4.22703C5.4929 2.96116 7.20979 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z'
                        stroke='#919191'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p className='text-xs text-[#919191]'>
                      {moment(transaction.createdAt).format('LT')}
                    </p>
                  </div>
                </div>
              </div>
              <p className='text-sm font-medium'>
                cUSD {formatcUsd(Number(transaction.amount))}
              </p>
            </div>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className='max-w-[80%] rounded-lg bg-white'>
        <DialogHeader>
          <DialogTitle className='text-left text-xl font-semibold'>
            Transaction Details
          </DialogTitle>
        </DialogHeader>
        {(transaction.type === 'pickup' || transaction.type === 'dropoff') && (
          <div className='mt-3 space-y-2'>
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-xs text-gray-400'>WASTE CATEGORY</p>
              <p className='text-sm capitalize'>
                {transaction.schedule?.material}
              </p>
            </div>
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-xs text-gray-400'>NUMBER OF WASTE</p>
              <p className='text-sm capitalize'>
                {transaction.schedule?.materialAmount}
              </p>
            </div>
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-xs text-gray-400'>NUMBER OF BAGS</p>
              <p className='text-sm capitalize'>
                {transaction.schedule?.containerAmount}
              </p>
            </div>
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-xs text-gray-400'>ADDRESS</p>
              <p className='text-sm capitalize'>{}</p>
            </div>
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-xs text-gray-400'>CONTACT NUMBER</p>
              <p className='text-sm capitalize'>
                +{transaction.schedule?.dialCode} {transaction.schedule?.phone}
              </p>
            </div>
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-xs text-gray-400'>
                {transaction.type.toUpperCase()} DATE
              </p>
              <p className='text-sm capitalize'>
                {moment(transaction.schedule?.date).format(
                  'MMMM Do YYYY, h:mm a',
                )}
              </p>
            </div>
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-xs text-gray-400'>STATUS</p>
              <p className='text-sm capitalize'>
                {transaction.schedule?.status}
              </p>
            </div>
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-xs text-gray-400'>REWARD</p>
              <p className='text-sm capitalize'>
                cUSD {formatcUsd(Number(transaction.schedule?.amount))}
              </p>
            </div>
            {/* <DialogPrimitive.Close className="w-full">
              <Button>Close</Button>
            </DialogPrimitive.Close> */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionCard;
