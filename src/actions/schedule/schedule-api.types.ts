import {
  SCHEDULE_CATEGORY_KEY,
  SCHEDULE_CONTAINER_AMOUNT_KEY,
  SCHEDULE_DROPOFF_ADDRESS_KEY,
  SCHEDULE_MATERIAL_AMOUNT_KEY,
  SCHEDULE_MATERIAL_KEY,
  SCHEDULE_PICKUP_ADDRESS_KEY,
} from '@/app/(main)/schedule/_utils/constants';

export type ISchedule = {
  [SCHEDULE_MATERIAL_AMOUNT_KEY]: number;
  [SCHEDULE_PICKUP_ADDRESS_KEY]: string;
  [SCHEDULE_CONTAINER_AMOUNT_KEY]: number;
  [SCHEDULE_DROPOFF_ADDRESS_KEY]: string;
  [SCHEDULE_MATERIAL_KEY]: string;
  [SCHEDULE_CATEGORY_KEY]: string;
};

export type RLocation = {
  id: string;
  address: string;
  region: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type RSchedule = {
  acceptedAt: string | null;
  address: string;
  amount: string;
  cancelledAt: string | null;
  category: string;
  city: string;
  containerAmount: number;
  country: string | null;
  createdAt: string;
  id: string;
  material: string;
  materialAmount: number;
  region: string;
  scheduleDate: string | null;
  status: string;
  updatedAt: string;
};
