import { InfoIcon } from 'lucide-react';
import * as React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function TotalEarningsTooltip() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type='button'
          role='combobox'
          aria-expanded={open}
          aria-controls='any'
          className='flex items-center space-x-2 rounded-lg border bg-[#F7F7F7] px-3 py-1 text-xs shadow-xs'
        >
          <span className='font-medium'>Wallet Balance</span>
          <InfoIcon size={12} />
        </button>
      </PopoverTrigger>
      <PopoverContent className='bg-white p-3 text-xs'>
        This is the total amount currently in your cUSD wallet
      </PopoverContent>
    </Popover>
  );
}
