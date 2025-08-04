'use client';
import { ChevronRight, Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useDisclosure } from '@/hooks/useDisclosure';

import GiftIcon from '@/components/assets/gift-icon';
import InviteIcon from '@/components/assets/invite-icon';
import LogoutIcon from '@/components/assets/logout-icon';
import NavigationHeader from '@/components/navigation-header';

import LogoutDrawer from '@/app/(main)/settings/_components/logout-drawer';
import { ROBO_URL } from '@/utils';
import { appRoutes } from '@/utils/routes';

const SettingsPage = () => {
  const router = useRouter();

  const logoutDrawerProps = useDisclosure();

  const { data: sessionData } = useSession();
  return (
    <div>
      <NavigationHeader
        handleBack={() => router.back()}
        header='User Profile'
      />
      <div className='p-5 pb-40 space-y-5'>
        <button
          className='flex items-center justify-between border rounded-full p-3 w-full text-start'
          onClick={() => router.push(appRoutes.settings.profile.root)}
        >
          <div className='flex items-center space-x-2'>
            <Image
              src={`${ROBO_URL}/${sessionData?.user.firstName}`}
              alt='avatar'
              width={48}
              height={48}
              className='aspect-square'
            />
            <div>
              <p className='capitalize font-medium'>
                {sessionData?.user.firstName} {sessionData?.user.lastName}
              </p>
              <p className='text-xs text-black/70 mt-0.5'>
                Manage profile details
              </p>
            </div>
          </div>
          <ChevronRight />
        </button>

        <div className='space-y-3'>
          <p className='text-xs font-medium text-black/70'>WALLET & CURRENCY</p>
          <button className='border p-3 rounded-xl w-full flex justify-between text-start'>
            <div className='flex items-center space-x-2'>
              <div className='bg-[#BA92EE0D] rounded-full p-2'>
                <Lock className='w-5 h-5 text-[#58259A]' />
              </div>
              <div>
                <p className='text-sm'>Create Security PIN</p>
                <p className='mt-0.5 text-xs text-black/70'>
                  Keep your wallet secure with a 4-digit PIN
                </p>
              </div>
            </div>
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>

        <div className='space-y-3'>
          <p className='text-xs font-medium text-black/70'>INVITE & REWARDS</p>
          <button className='border p-3 rounded-xl w-full flex justify-between text-start'>
            <div className='flex items-center space-x-2'>
              <div className='bg-[#0369370D] rounded-full p-2'>
                <InviteIcon />
              </div>
              <div>
                <p className='text-sm'>Invite & Earn</p>
                <p className='mt-0.5 text-xs text-black/70 max-w-'>
                  Share Wayst and earn cUSD for every referral
                </p>
              </div>
            </div>
            <ChevronRight className='w-4 h-4' />
          </button>

          <button
            onClick={() => router.push(appRoutes.settings.profile.updatePhone)}
            className='border p-3 rounded-xl w-full flex justify-between text-start'
          >
            <div className='flex items-center space-x-2'>
              <div className='bg-[#92C8EE0D] rounded-full p-2'>
                <GiftIcon />
              </div>
              <div>
                <p className='text-sm'>My Rewards</p>
                <p className='mt-0.5 text-xs text-black/70 max-w-'>
                  View your total cUSD earnings and claim history
                </p>
              </div>
            </div>
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>

        <div className='space-y-3'>
          <p className='text-xs font-medium text-black/70'>SUPPORT & INFO</p>
          <a
            href='https://t.me/+kBh3jiVW4OFmNDJk'
            className='border p-3 rounded-xl w-full flex justify-between text-start'
          >
            <div className='flex items-center space-x-2'>
              <Image
                src='/svg/telegram.svg'
                alt='telegram'
                width={36}
                height={36}
              />
              <div>
                <p className='text-sm'>Telegram Support</p>
                <p className='text-xs text-black/70'>
                  Need help? Reach out to us on Telegram.
                </p>
              </div>
            </div>
            <ChevronRight className='w-4 h-4' />
          </a>
        </div>

        <div className='space-y-3'>
          <p className='text-xs font-medium text-black/70'>APP SETTINGS</p>
          <button
            className='border p-3 rounded-xl w-full flex justify-between text-start'
            onClick={logoutDrawerProps.onOpen}
          >
            <div className='flex items-center space-x-2'>
              <div className='bg-[#EC1D1D08] rounded-full p-2'>
                <LogoutIcon />
              </div>
              <div>
                <p className='text-sm'>Log Out</p>
                <p className='text-xs text-black/70'>
                  Temporarily logout of current session
                </p>
              </div>
            </div>
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>
      </div>
      <LogoutDrawer
        isOpen={logoutDrawerProps.isOpen}
        onToggle={logoutDrawerProps.onToggle}
      />
    </div>
  );
};

export default SettingsPage;
