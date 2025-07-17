import Image from 'next/image';
import React from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const CurrencySelect = () => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger className='flex items-center space-x-1 p-2 border rounded-lg shadow-sm'>
          <Image src='/images/cusd.png' alt='cusd' width={20} height={20} />
          <p>Celo Dollar - cUSD</p>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='text-start'>
              Change prefered currency?
            </DrawerTitle>
          </DrawerHeader>
          <div></div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CurrencySelect;
