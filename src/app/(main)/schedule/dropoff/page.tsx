'use client';
import { toast } from 'sonner';

import GenInput from '@/components/gen-input/gen-input';
import InputNumber from '@/components/gen-input/input-number';
import { Button } from '@/components/ui/button';

import MaterialSelectItem from '@/app/(main)/schedule/_components/material-select-item';
import { useSchedule } from '@/app/(main)/schedule/_hooks/useSchedule';
import {
  materials,
  SCHEDULE_ADDRESS_KEY,
  SCHEDULE_CITY_KEY,
  SCHEDULE_CONTAINER_AMOUNT_KEY,
  SCHEDULE_MATERIAL_AMOUNT_KEY,
  SCHEDULE_MATERIAL_KEY,
  SCHEDULE_REGION_KEY,
} from '@/app/(main)/schedule/_utils/constants';

const DropoffPage = () => {
  const { formik, getInputProps, isLoading } = useSchedule();

  return (
    <div className='p-5 pb-32'>
      <p className='mt-5 text-sm font-medium'>Select Category</p>
      <div className='hide-scroll mt-3 flex flex-nowrap space-x-2 overflow-x-scroll'>
        {materials.map((material, index) => (
          <button
            aria-label={material.value}
            type='button'
            key={index}
            onClick={() =>
              material.active
                ? formik.setFieldValue(SCHEDULE_MATERIAL_KEY, material.value)
                : toast.info('Coming soon')
            }
          >
            <MaterialSelectItem
              key={material.value}
              material={material}
              selected={material.value === formik.values[SCHEDULE_MATERIAL_KEY]}
            />
          </button>
        ))}
      </div>

      <div className='mt-10'>
        <form
          className='flex flex-col justify-between'
          onSubmit={formik.handleSubmit}
        >
          <div className='space-y-3'>
            <InputNumber
              id={SCHEDULE_MATERIAL_AMOUNT_KEY}
              label='Number of Waste'
              placeholder='Minimum of 50 pieces'
              {...getInputProps(SCHEDULE_MATERIAL_AMOUNT_KEY)}
              // value={formatAmount(
              //   String(formik.values[PICKUP_MATERIAL_AMOUNT_KEY])
              // )}
              // inputMode="numeric"
            />
            <InputNumber
              id={SCHEDULE_CONTAINER_AMOUNT_KEY}
              label='Number of Bags'
              placeholder='Please indicate number of bags'
              {...getInputProps(SCHEDULE_CONTAINER_AMOUNT_KEY)}
            />
            <GenInput
              id={SCHEDULE_ADDRESS_KEY}
              label='Address'
              placeholder='Enter your full address'
              {...getInputProps(SCHEDULE_ADDRESS_KEY)}
            />
            <GenInput
              id={SCHEDULE_REGION_KEY}
              label='Region'
              placeholder='Enter your region'
              {...getInputProps(SCHEDULE_REGION_KEY)}
            />
            <GenInput
              id={SCHEDULE_CITY_KEY}
              label='City'
              placeholder='Enter your city'
              {...getInputProps(SCHEDULE_CITY_KEY)}
            />
          </div>
          <Button isLoading={isLoading} className='mt-4' type='submit'>
            Schedule Pickup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DropoffPage;
