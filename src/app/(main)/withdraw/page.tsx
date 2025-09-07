'use client';
import { ChevronRight, Landmark } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import NavigationHeader from '@/components/navigation-header';

import { appRoutes } from '@/utils/routes';

const WithdrawalPage = () => {
  const router = useRouter();
  const options = [
    {
      icon: <Landmark className='text-brand-primary w-6 h-6' />,
      active: true,
      title: 'Withdraw to Bank',
      description: 'Withdraw to your local bank account',
      href: appRoutes.withdraw.bank,
    },
    {
      icon: (
        <Image
          src='/images/crypto-withdraw.png'
          alt='crypto'
          width={24}
          height={24}
        />
      ),
      active: false,
      title: 'Withdraw to Crypto Wallet',
      description: 'Transfer to other crypto currencies',
      href: appRoutes.withdraw.root,
    },
  ];
  return (
    <div>
      <NavigationHeader
        handleBack={() => router.back()}
        header='Withdraw Funds'
      />
      <div className='p-5'>
        <p className='text-black/70'>
          Transfer your cUSD or NGN to your bank account or wallet address
          quickly and securely.
        </p>

        <div className='mt-4 space-y-2'>
          {options.map((option, index) => (
            <button
              key={index}
              className={`flex justify-between space-x-2 items-center p-3 border border-[#1111110D] rounded-xl transition-opacity w-full ${
                option.active ? '' : 'opacity-40 pointer-events-none'
              }`}
              onClick={() => router.push(option.href)}
              disabled={!option.active}
            >
              <div className='flex items-center space-x-2'>
                {option.icon}
                <div>
                  <div className='text-sm flex items-center space-x-2'>
                    <p>{option.title}</p>
                    {/* {!option.active && (
                      <p className='text-xs text-[#9918E3] bg-[#9918E31A] p-1 rounded-xl'>
                        Coming soon
                      </p>
                    )} */}
                  </div>
                  <p className='text-xs text-black/70 mt-0.5 text-wrap'>
                    {option.description}
                  </p>
                </div>
              </div>
              <ChevronRight className='w-4 h-4' />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;
