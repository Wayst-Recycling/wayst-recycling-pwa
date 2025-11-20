'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { useDisclosure } from '@/hooks/useDisclosure';

import GenSelect from '@/components/gen-select/gen-select';
import { Button } from '@/components/ui/button';

import { useGetDropoffLocationsQuery } from '@/actions/schedule/schedule-api.actions';
import { useGetDeliveryAddressQuery } from '@/actions/user/user-api.action';
import AddressDrawer from '@/app/(main)/schedule/_components/address-drawer';
import MaterialSelectItem from '@/app/(main)/schedule/_components/material-select-item';
import { useSchedule } from '@/app/(main)/schedule/_hooks/useSchedule';
import {
  materials,
  SCHEDULE_CONTAINER_AMOUNT_KEY,
  SCHEDULE_DROPOFF_ADDRESS_KEY,
  SCHEDULE_MATERIAL_AMOUNT_KEY,
  SCHEDULE_MATERIAL_KEY,
  SCHEDULE_PICKUP_ADDRESS_KEY,
} from '@/app/(main)/schedule/_utils/constants';
import { toTitleCase } from '@/utils/format';
import { appRoutes } from '@/utils/routes';

const ScheduleForm = ({ category }: { category: 'pickup' | 'dropoff' }) => {
  const { formik, getSelectProps, isLoading } = useSchedule();
  const addressDrawerProps = useDisclosure();

  const { data, isLoading: isLoadingAddress } = useGetDeliveryAddressQuery();

  const deliveryAddressOptions = data?.data.map((item) => ({
    value: item.id,
    label: item.address,
  }));

  const pathname = usePathname();

  const { data: locationResponse } = useGetDropoffLocationsQuery({
    limit: 20,
    page: 1,
  });

  const locationOptions =
    locationResponse?.data.data.map((location) => ({
      value: location.id,
      label: `${location.address}, ${location.city}, ${location.region}`,
    })) || [];

  return (
    <>
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
        {formik.values[SCHEDULE_MATERIAL_KEY] && (
          <form
            className='flex flex-col justify-between'
            onSubmit={formik.handleSubmit}
          >
            <div className='space-y-3'>
              <GenSelect
                id={SCHEDULE_MATERIAL_AMOUNT_KEY}
                label={`Number of ${toTitleCase(formik.values[SCHEDULE_MATERIAL_KEY])}s`}
                placeholder='Number of pieces'
                {...getSelectProps(SCHEDULE_MATERIAL_AMOUNT_KEY)}
                options={[
                  {
                    value: '50-100',
                    label: '50-100 pieces',
                  },
                  {
                    value: '100-200',
                    label: '100-200 pieces',
                  },
                  {
                    value: '200-300',
                    label: '200-300 pieces',
                  },
                  {
                    value: '500+',
                    label: '500+ pieces',
                  },
                ]}
              />

              <GenSelect
                id={SCHEDULE_CONTAINER_AMOUNT_KEY}
                label='Number of Bags'
                placeholder='Number of bags'
                {...getSelectProps(SCHEDULE_CONTAINER_AMOUNT_KEY)}
                options={[
                  {
                    value: '1-10',
                    label: '1-10 bags',
                  },
                  {
                    value: '10-20',
                    label: '10-20 bags',
                  },
                  {
                    value: '20-30',
                    label: '20-30 bags',
                  },
                  {
                    value: '30+',
                    label: '30+ bags',
                  },
                ]}
              />
              {category === 'dropoff' && (
                <GenSelect
                  id={SCHEDULE_DROPOFF_ADDRESS_KEY}
                  label='Location'
                  placeholder='Select address'
                  {...getSelectProps(SCHEDULE_DROPOFF_ADDRESS_KEY)}
                  options={locationOptions}
                />
              )}
              {category === 'pickup' && (
                <>
                  <GenSelect
                    id={SCHEDULE_PICKUP_ADDRESS_KEY}
                    label='Location'
                    placeholder='Select address'
                    {...getSelectProps(SCHEDULE_PICKUP_ADDRESS_KEY)}
                    options={deliveryAddressOptions || []}
                    isLoading={isLoadingAddress}
                  />
                  <div className='flex justify-end mt-1'>
                    <button
                      type='button'
                      onClick={addressDrawerProps.onOpen}
                      className='text-xs text-brand-primary font-semibold'
                    >
                      Add address
                    </button>
                  </div>
                </>
              )}
            </div>
            <Button isLoading={isLoading} className='mt-4' type='submit'>
              Schedule {pathname === appRoutes.schedule.pickup && 'Pickup'}
              {pathname === appRoutes.schedule.dropoff && 'Dropoff'}
            </Button>
          </form>
        )}
      </div>

      <AddressDrawer {...addressDrawerProps} />
    </>
  );
};

export default ScheduleForm;
