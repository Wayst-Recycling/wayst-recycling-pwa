import { POST_METHOD } from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import { SCHEDULE_PATH } from '@/actions/schedule/schedule-constants.server';
import { ISchedule } from '@/actions/schedule/schedule-types.server';

const ScheduleAction = authenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    schedule: build.mutation<INetworkSuccessResponse<unknown>, ISchedule>({
      query: (payload) => ({
        url: SCHEDULE_PATH,
        method: POST_METHOD,
        data: payload,
      }),
    }),
  }),
});

export const { useScheduleMutation } = ScheduleAction;
