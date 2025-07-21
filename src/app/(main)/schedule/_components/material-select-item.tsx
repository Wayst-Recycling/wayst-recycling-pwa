import { Check } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

const MaterialSelectItem = ({
  material,
  selected,
}: {
  material: {
    label: string;
    value: string;
    backgroundColor: string;
    image: string;
    active: boolean;
  };
  selected: boolean;
}) => {
  return (
    <div
      className={cn(
        'flex min-w-max items-center space-x-2 rounded-full p-2 pr-4',
        !material.active && 'opacity-40',
      )}
      style={{ backgroundColor: material.backgroundColor }}
    >
      <Image
        src={material.image}
        className='aspect-square'
        alt={material.value}
        width={32}
        height={32}
      />
      <p>{material.label}</p>
      {selected && <Check />}
    </div>
  );
};

export default MaterialSelectItem;
