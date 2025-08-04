import { signOut } from 'next-auth/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};
const LogoutDrawer = ({ isOpen, onToggle }: Props) => {
  return (
    <Drawer open={isOpen} onOpenChange={onToggle}>
      <DrawerContent className='px-5'>
        <DrawerHeader>
          <DrawerTitle className='text-start'>
            Log out of your account?
          </DrawerTitle>
        </DrawerHeader>

        <div>
          <p className='text-sm text-black/70'>
            You’ll be signed out from Wayst and will need to log in again to
            access your wallet and rewards.
          </p>
          <div className='py-4 grid grid-cols-2 gap-4'>
            <Button onClick={onToggle} variant='ghost' className='rounded-full'>
              Cancel
            </Button>
            <Button
              onClick={() => signOut()}
              variant='destructive'
              className='rounded-full'
            >
              Logout
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LogoutDrawer;
