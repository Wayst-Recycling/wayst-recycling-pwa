import { RSchedule } from '@/actions/schedule/schedule-api.types';

export type RTransaction = {
  amount: string;
  charges: string;
  createdAt: string;
  id: string;
  schedule: RSchedule;
  status: string;
  type: string;
};
