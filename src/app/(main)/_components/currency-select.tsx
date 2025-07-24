import Image from 'next/image';
import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { useAppDispatch, useAppSelector } from '@/store';

import { currencies } from '@/app/(main)/_utils/constants';
import { CURRENCY_REDUCER_PATH } from '@/slices/constants';
import { updateActiveCurrency } from '@/slices/currency.slice';

const CurrencySelect = () => {
  const { activeCurrency } = useAppSelector(
    (state) => state[CURRENCY_REDUCER_PATH],
  );

  const dispatch = useAppDispatch();

  const selectedCurrency = currencies.find((x) => x.id === activeCurrency);

  return (
    <div>
      <Drawer>
        {selectedCurrency && (
          <DrawerTrigger className='flex items-center space-x-1 p-2 border rounded-lg shadow-sm'>
            <Image
              src={selectedCurrency.img}
              alt='cusd'
              width={20}
              height={20}
            />
            <p>
              {selectedCurrency.description} - {selectedCurrency.title}
            </p>
          </DrawerTrigger>
        )}
        <DrawerContent className='px-5'>
          <DrawerHeader>
            <DrawerTitle className='text-start'>
              Change prefered currency?
            </DrawerTitle>
          </DrawerHeader>
          {currencies.map((currency) => (
            <button
              key={currency.id}
              onClick={() => dispatch(updateActiveCurrency(currency.id))}
              className='flex justify-between py-3 border-b items-center text-start'
            >
              <div className='flex space-x-2 items-center'>
                <Image
                  src={currency.img}
                  alt={currency.title}
                  width={40}
                  height={40}
                />
                <div>
                  <p className='text-sm'>{currency.title}</p>
                  <p className='text-xs mt-1 text-black/70'>
                    {currency.description}
                  </p>
                </div>
              </div>
              {activeCurrency === currency.id ? (
                <FaCircleCheck fill='#036937' stroke='white' />
              ) : (
                <></>
              )}
            </button>
          ))}

          <div className='flex items-center justify-center space-x-2 mt-20'>
            <p>Powered by</p>
            <a
              href='https://www.coingecko.com/en/api/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <figure className='relative w-32 aspect-video'>
                <Image src='/svg/coingecko.svg' alt='coingecko' fill />
              </figure>
            </a>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CurrencySelect;
