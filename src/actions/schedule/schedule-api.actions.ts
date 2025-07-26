import { GET_METHOD, POST_METHOD } from '@/actions/action.constants';
import {
  INetworkSuccessResponse,
  IPaginatedResponse,
} from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import {
  DROPOFF_LOCATION_PATH,
  SCHEDULE_PATH,
} from '@/actions/schedule/schedule-api.constants';
import { ISchedule, RLocation } from '@/actions/schedule/schedule-api.types';

const ScheduleApi = authenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    schedule: build.mutation<INetworkSuccessResponse<unknown>, ISchedule>({
      query: (payload) => ({
        url: SCHEDULE_PATH,
        method: POST_METHOD,
        data: payload,
      }),
    }),

    getDropoffLocations: build.query<
      IPaginatedResponse<RLocation>,
      { page: number; limit: number }
    >({
      query: (payload) => ({
        url: DROPOFF_LOCATION_PATH,
        method: GET_METHOD,
        params: payload,
      }),
    }),
  }),
});

export const { useScheduleMutation, useGetDropoffLocationsQuery } = ScheduleApi;
