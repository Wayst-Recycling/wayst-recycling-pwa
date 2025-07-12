'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons/lib';

import { cn } from '@/lib/utils';

const FooterLink = ({
  icon: Icon,
  text,
  link,
  index = false,
}: {
  icon: IconType;
  text: string;
  link: string;
  index?: boolean;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={link}
      className={cn(
        'flex flex-col items-center space-y-1 text-[#919191]',
        !index && pathname.startsWith(link) && 'text-[#036937]',
        index && pathname === link && 'text-[#036937]',
      )}
    >
      <Icon className='aspect-square w-4' />
      <p className='text-xs'>{text}</p>
    </Link>
  );
};

export default FooterLink;
